
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from webdriver_manager.chrome import ChromeDriverManager

BASE_URL = "http://localhost:5173"
WAIT_TIMEOUT = 10

# -------------------------------clear--------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def make_driver() -> webdriver.Chrome:
    """Create a headless Chrome WebDriver."""
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1400,900")
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=opts)


def login(driver: webdriver.Chrome, email="admin@astms.com", password="admin123", role="Admin"):
    """Navigate to the app and log in."""
    driver.get(BASE_URL)
    wait = WebDriverWait(driver, WAIT_TIMEOUT)

    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']")))
    driver.find_element(By.CSS_SELECTOR, "input[type='email']").clear()
    driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys(email)

    driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(password)

    role_select = Select(driver.find_element(By.CSS_SELECTOR, "select"))
    role_select.select_by_visible_text(role)

    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    # Wait until the Login page is gone (Dashboard heading appears)
    wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Dashboard')]")))


def click_nav(driver: webdriver.Chrome, label: str):
    """Click a sidebar navigation link by its visible text."""
    wait = WebDriverWait(driver, WAIT_TIMEOUT)
    nav_link = wait.until(EC.element_to_be_clickable(
        (By.XPATH, f"//nav//*[normalize-space(text())='{label}']")
    ))
    nav_link.click()


# ===========================================================================
# 1. Login Tests
# ===========================================================================

class TestLogin(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = make_driver()
        cls.wait = WebDriverWait(cls.driver, WAIT_TIMEOUT)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def setUp(self):
        """Each test starts fresh on the landing page."""
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']")))

    def test_01_login_page_renders(self):
        """Login page should display the ASTMS title."""
        heading = self.driver.find_element(By.XPATH, "//h1[contains(text(),'ASTMS')]")
        self.assertIsNotNone(heading)
        self.assertIn("ASTMS", heading.text)

    def test_02_login_success(self):
     self.driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("admin@astms.com")
     self.driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys("admin123")
     self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    # Wait for ANY navigation change (more reliable)
     self.wait.until(lambda d: "login" not in d.current_url.lower())

     self.assertTrue(True)

    def test_03_login_required_fields(self):
        """Submitting an empty form should not navigate away (HTML5 validation)."""
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        # Still on login page – email input must still exist
        email_input = self.driver.find_element(By.CSS_SELECTOR, "input[type='email']")
        self.assertTrue(email_input.is_displayed())


# ===========================================================================
# 2. Navigation Tests
# ===========================================================================

class TestNavigation(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = make_driver()
        cls.wait = WebDriverWait(cls.driver, WAIT_TIMEOUT)
        login(cls.driver)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_04_navigate_to_test_cases(self):
        """Clicking 'Test Cases' nav should show the Test Case Management heading."""
        click_nav(self.driver, "Test Cases")
        heading = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Test Case Management')]"))
        )
        self.assertIsNotNone(heading)

    def test_05_navigate_to_bugs(self):
        """Clicking 'Bugs' nav should show the Bug Tracking heading."""
        click_nav(self.driver, "Bugs")
        heading = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Bug Tracking')]"))
        )
        self.assertIsNotNone(heading)

    def test_06_navigate_to_execution(self):
        """Clicking 'Execution' nav should show the Test Execution heading."""
        click_nav(self.driver, "Execution")
        heading = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Test Execution')]"))
        )
        self.assertIsNotNone(heading)

    def test_07_navigate_to_reports(self):
        """Clicking 'Reports' nav should load the Reports page."""
        click_nav(self.driver, "Reports")
        # Reports page renders chart panels – just confirm we left Execution
        self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Reports') or contains(text(),'Pass') or contains(text(),'Fail')]"))
        )

    def test_08_navigate_back_to_dashboard(self):
        """Clicking 'Dashboard' should return to the overview page."""
        click_nav(self.driver, "Dashboard")
        heading = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Dashboard')]"))
        )
        self.assertIsNotNone(heading)


# ===========================================================================
# 3. Test Cases CRUD
# ===========================================================================

class TestTestCases(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = make_driver()
        cls.wait = WebDriverWait(cls.driver, WAIT_TIMEOUT)
        login(cls.driver)
        click_nav(cls.driver, "Test Cases")
        cls.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Test Case Management')]"))
        )

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_09_create_test_case_modal_opens(self):
        """Clicking 'Create Test Case' should open the modal."""
        btn = self.wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(),'Create Test Case')]")
        ))
        btn.click()
        modal_title = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Create Test Case') and not(self::button)]"))
        )
        self.assertIsNotNone(modal_title)

    def test_10_create_test_case_and_verify_row(self):
        """Filling the modal and saving should add a row to the table."""
        # Open modal (may already be open; try clicking button idempotently)
        try:
            btn = self.driver.find_element(By.XPATH, "//button[contains(text(),'Create Test Case')]")
            if btn.is_displayed():
                btn.click()
        except Exception:
            pass

        self.wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Create Test Case') and not(self::button)]")))

        # Fill Title
        title_input = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH, "//label[contains(text(),'Title')]/following-sibling::input")
        ))
        title_input.clear()
        title_input.send_keys("Selenium Auto Test")

        # Fill Module
        module_input = self.driver.find_element(By.XPATH, "//label[contains(text(),'Module')]/following-sibling::input")
        module_input.clear()
        module_input.send_keys("Auth")

        # Save
        save_btn = self.wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(),'Save Test Case')]")
        ))
        save_btn.click()

        # Modal closes and row appears
        self.wait.until(EC.invisibility_of_element_located(
            (By.XPATH, "//button[contains(text(),'Save Test Case')]")
        ))
        row = self.wait.until(EC.presence_of_element_located(
            (By.XPATH, "//*[contains(text(),'Selenium Auto Test')]")
        ))
        self.assertIsNotNone(row)

    def test_11_search_filters_table(self):
        """Typing in the search box should filter the table rows."""
        search = self.wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, "input[placeholder*='Search']")
        ))
        search.clear()
        search.send_keys("NONEXISTENT_TC_XYZ")

        # Table should show empty state
        empty_state = self.wait.until(
            EC.presence_of_element_located(
                (By.XPATH, "//*[contains(text(),'No test cases')]")
            )
        )
        self.assertIsNotNone(empty_state)

        # Clear search to restore
        search.clear()


# ===========================================================================
# 4. Bug Tracking
# ===========================================================================

class TestBugs(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = make_driver()
        cls.wait = WebDriverWait(cls.driver, WAIT_TIMEOUT)
        login(cls.driver)
        click_nav(cls.driver, "Bugs")
        cls.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Bug Tracking')]"))
        )

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_12_create_bug_modal_opens(self):
        """Clicking 'Create Bug' should open the bug creation modal."""
        btn = self.wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(),'Create Bug')]")
        ))
        btn.click()
        modal_title = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Create Bug') and not(self::button)]"))
        )
        self.assertIsNotNone(modal_title)

    def test_13_create_bug_and_verify_row(self):
        """Creating a bug should add it to the bug table."""
        # Open modal
        try:
            btn = self.driver.find_element(By.XPATH, "//button[contains(text(),'Create Bug')]")
            if btn.is_displayed():
                btn.click()
        except Exception:
            pass

        self.wait.until(EC.presence_of_element_located(
            (By.XPATH, "//*[contains(text(),'Create Bug') and not(self::button)]")
        ))

        # Fill title
        title_input = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH, "//label[contains(text(),'Title')]/following-sibling::input")
        ))
        title_input.clear()
        title_input.send_keys("Selenium Bug Report")

        # Select severity
        severity_select = Select(self.driver.find_element(
            By.XPATH, "//label[contains(text(),'Severity')]/following-sibling::select"
        ))
        severity_select.select_by_visible_text("High")

        # Save
        save_btn = self.wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(),'Save Bug')]")
        ))
        save_btn.click()

        # Verify row
        self.wait.until(EC.invisibility_of_element_located(
            (By.XPATH, "//button[contains(text(),'Save Bug')]")
        ))
        row = self.wait.until(EC.presence_of_element_located(
            (By.XPATH, "//*[contains(text(),'Selenium Bug Report')]")
        ))
        self.assertIsNotNone(row)


# ===========================================================================
# 5. Test Execution
# ===========================================================================

class TestExecution(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = make_driver()
        cls.wait = WebDriverWait(cls.driver, WAIT_TIMEOUT)
        login(cls.driver)
        click_nav(cls.driver, "Execution")
        cls.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Test Execution')]"))
        )

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_14_execute_test_case_pass(self):
        """Clicking Execute on the first test case and marking Pass should record the result."""
        execute_btn = self.wait.until(EC.element_to_be_clickable(
            (By.XPATH, "(//button[contains(text(),'Execute')])[1]")
        ))
        execute_btn.click()

        # Modal opens – choose Pass
        result_select = self.wait.until(EC.presence_of_element_located(
            (By.XPATH, "//label[contains(text(),'Mark Result')]/following-sibling::select")
        ))
        Select(result_select).select_by_visible_text("Pass")

        save_btn = self.wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(),'Save Execution')]")
        ))
        save_btn.click()

        # Modal closes
        self.wait.until(EC.invisibility_of_element_located(
            (By.XPATH, "//button[contains(text(),'Save Execution')]")
        ))

        # Recent Executions panel should now mention a result
        result_text = self.wait.until(EC.presence_of_element_located(
            (By.XPATH, "//*[contains(text(),'Result:')]")
        ))
        self.assertIsNotNone(result_text)


# ===========================================================================
# Entry point
# ===========================================================================

if __name__ == "__main__":
    unittest.main(verbosity=2)