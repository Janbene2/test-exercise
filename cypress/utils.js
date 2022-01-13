export const createNewPlace = (locationName, x, y) => {
    //create new place
    cy.get("#places-tab").click();
    cy.get(".destination-create-poi > .tool-tip > .btn").click();
    cy.wait(1000);
    //choose location on the map
    function moveMarker(x, y) {
        cy.get(".mb-0 > .fas")
            .trigger('mousedown',{ which: 1 })
            .trigger('mousemove', { clientX: x, clientY: y })
            .trigger('mouseup', { force: true });

    }
    moveMarker(x,y);

    //create location
    cy.get(".mb-1 > .btn-primary").click();
    cy.get("input.form-control").type(locationName);
    cy.get(".destination-create-poi > .tool-tip > .btn").click();

    //wait for open location page

    cy.get("a[data-original-title='Go back to Oslo destination']").click();

    //wait for return to place page

    cy.get("h2").should("contain","\n" +
        "            Oslo\n" +
        "            ");
}