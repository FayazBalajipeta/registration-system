describe("Registration Form Automation", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  /* ==========================
     FLOW A: NEGATIVE SCENARIO
  ========================== */
  it("Should keep submit disabled when Last Name is missing", () => {

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

    // ✅ Correct assertion
    cy.get("#submitBtn").should("be.disabled");

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

    // ✅ Button now enables correctly
    cy.get("#submitBtn")
      .should("not.be.disabled")
      .click();

    cy.get("#successMsg")
      .should("be.visible")
      .and("contain", "Registration Successful");

    cy.screenshot("success-state");
  });

  /* ==========================
     FLOW C: LOGIC VALIDATION
  ========================== */
  it("Should validate dropdowns and password strength", () => {

    cy.get("#country").select("USA");
    cy.get("#state").should("not.be.disabled");

    cy.get("#state").select("Texas");
    cy.get("#city").should("not.be.disabled");

    cy.get("#password").type("abc");
    cy.get("#strength").should("contain", "Weak");

    cy.get("#password").clear().type("Abc123");
    cy.get("#strength").should("contain", "Strong");

    cy.get("#confirmPassword").type("Wrong123");
    cy.get("#submitBtn").should("be.disabled");

    cy.screenshot("logic-validation");
  });

});
