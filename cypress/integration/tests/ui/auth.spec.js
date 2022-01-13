import {createNewPlace} from "../../../utils";

describe('User Login, Create new destination and place and location', () => {

    it('user login', () => {
        cy.visit("https://cms.smart-guide.org/");

        cy.get("#Username").type("honza");
        cy.get("#Password").type("Pass1024*");

        cy.get("button[type='submit']").click();

        cy.url().should('equal', 'https://cms.smart-guide.org/');
    })

    it('create new destination and its places', () => {
        cy.visit("https://cms.smart-guide.org/");

        cy.get("#Username").type("Johny");
        cy.get("#Password").type("Pass1024*");

        cy.get("button[type='submit']").click();

        //choose Paris as destination
        cy.get("a.btn.btn-outline-primary").contains("Add new destination").click();
        cy.get("input.form-control[placeholder='Start typing to choose a destination']").type("Almaty");
        cy.get(".tt-suggestion").eq(0).click();

        //choose english as a language
        cy.get(".selectize-input").click();
        cy.get("div.option").contains("French").click();

        //click submit button
        cy.get(".btn-primary").click();

        cy.get("h2").should("contain", "\n" +
            "            Almaty\n" +
            "            ");
        cy.get("h2 span").should("contain", "\n" +
            "    French");

        //create new places in destination detail
        //nefunguje
        createNewPlace("Place_1", 50, 50);
        createNewPlace("Place_2", 100, 100);
        createNewPlace( "Place_3", 80, 40);

        //create tour
        cy.get("a.nav-link").contains("Tours (0)").click();
        cy.get("a.destination-create-tour").click();
        cy.get("input#Args_Name").type("Tour");
        cy.get(".selectize-input").click();
        cy.get(".option").contains("Bike").click();

        cy.get("#submit").click();

        cy.url().should('include', '/Tours');

        cy.get(".h2").should("contain", "\n" +
            "            france\n" +
            "            ");
        //
    })

})