describe("Registration Form Automation", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  /* ==========================
     FLOW A: NEGATIVE SCENARIO
  ========================== */
  it("Should show error when Last Name is missing", () => {
    cy.title().then(title => {
      cy.log("Page Title:", title);
    });

    cy.url().then(url => {
      cy.log("Page URL:", url);
    });

    cy.get("#firstName").type("Fayaz");
    cy.get("#email").type("fayaz@gmail.com");
    cy.get("#phone").type("9876543210");

    cy.get('input[value="Male"]').check();

    cy.get("#country").select("India");
    cy.get("#state").select("Telangana");
    cy.get("#city").select("Hyderabad");

    cy.get("#password").type("Test@123");
    cy.get("#confirmPassword").type("Test@123");

    cy.get("#terms").check();

    cy.get("#submitBtn").click();

    cy.get("#formError")
      .should("be.visible")
      .and("contain", "Last Name");

    cy.screenshot("error-state");
  });

  /* ==========================
     FLOW B: POSITIVE SCENARIO
  ========================== */
  it("Should submit successfully with valid data", () => {
    cy.get("#firstName").type("Fayaz");
    cy.get("#lastName").type("Balaji");
    cy.get("#email").type("fayaz@gmail.com");
    cy.get("#phone").type("9876543210");

    cy.get('input[value="Male"]').check();

    cy.get("#country").select("India");
    cy.get("#state").select("Telangana");
    cy.get("#city").select("Hyderabad");

    cy.get("#password").type("Test@123");
    cy.get("#confirmPassword").type("Test@123");

    cy.get("#terms").check();

    cy.get("#submitBtn").should("not.be.disabled").click();

    cy.get("#successMsg")
      .should("be.visible")
      .and("contain", "Registration Successful");

    cy.screenshot("success-state");
  });

  /* ==========================
     FLOW C: LOGIC VALIDATION
  ========================== */
  it("Should validate dynamic dropdowns and password logic", () => {

    // Country → State
    cy.get("#country").select("USA");
    cy.get("#state").should("not.be.disabled");

    // State → City
    cy.get("#state").select("Texas");
    cy.get("#city").should("not.be.disabled");

    // Password strength
    cy.get("#password").type("abc");
    cy.get("#strength").should("contain", "Weak");

    cy.get("#password").clear().type("Abc123");
    cy.get("#strength").should("contain", "Strong");

    // Confirm password mismatch
    cy.get("#confirmPassword").type("Wrong123");
    cy.get("#submitBtn").should("be.disabled");

    cy.screenshot("logic-validation");
  });

});
