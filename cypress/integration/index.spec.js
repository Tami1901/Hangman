/// <reference types="cypress" />

describe('Tests whole app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Shows login page', () => {
    cy.get('[data-test=title]')
      .first()
      .should('have.text', 'Enter your nickname and start the game');
  });

  it('Can win game', () => {
    cy.get('input[name=nickname]').first().type('foobar');
    cy.get('button[type=submit]').click();

    cy.intercept('GET', 'https://api.quotable.io/random', { fixture: 'quote.json' });
    cy.waitFor('network-idle');

    cy.get('[data-test=score]').should('have.text', '0 / 6');

    cy.get('[data-test=keyboard-F]').click();
    cy.get('[data-test=score]').should('have.text', '0 / 6');

    // word is foobar
    cy.get('[data-test=keyboard-K]').click();
    cy.get('[data-test=score]').should('have.text', '1 / 6');

    cy.get('[data-test=keyboard-O]').click();
    cy.get('[data-test=keyboard-B]').click();
    cy.get('[data-test=keyboard-A]').click();
    cy.get('[data-test=keyboard-R]').click();

    cy.get('[data-test=endgame]').should('have.text', '🎉 Congratulations! You win!');
  });

  it('Can lose game', () => {
    cy.get('input[name=nickname]').first().type('foobar');
    cy.get('button[type=submit]').click();

    cy.intercept('GET', 'https://api.quotable.io/random', { fixture: 'quote.json' });
    cy.waitFor('network-idle');

    cy.get('[data-test=score]').should('have.text', '0 / 6');

    // word is foobar
    cy.get('[data-test=keyboard-K]').click();
    cy.get('[data-test=score]').should('have.text', '1 / 6');

    cy.get('[data-test=keyboard-J]').click();
    cy.get('[data-test=score]').should('have.text', '2 / 6');

    cy.get('[data-test=keyboard-L]').click();
    cy.get('[data-test=score]').should('have.text', '3 / 6');

    cy.get('[data-test=keyboard-E]').click();
    cy.get('[data-test=score]').should('have.text', '4 / 6');

    cy.get('[data-test=keyboard-P]').click();
    cy.get('[data-test=score]').should('have.text', '5 / 6');

    cy.get('[data-test=keyboard-Q]').click();
    cy.get('[data-test=score]').should('have.text', '6 / 6');

    cy.get('[data-test=endgame]').should('have.text', '😢 Better luck, next time! Try new game');
  });

  it('shows scores', () => {
    cy.get('input[name=nickname]').first().type('foobar');
    cy.get('button[type=submit]').click();

    cy.intercept(
      'GET',
      'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores',
      { fixture: 'scores.json' }
    );

    cy.get('[href="/scores"]').click();
    cy.waitFor('network-idle');

    cy.get('table > tbody').children().should('have.length', 1);
  });

  it('can login and logout', () => {
    cy.get('[data-test=nav-right]').children().should('have.length', 1);

    cy.get('input[name=nickname]').first().type('foobar');
    cy.get('button[type=submit]').click();

    cy.get('[data-test=nav-right]').children().should('have.length', 2);
    cy.get('[data-test=avatar] > div').should('have.text', 'f');

    cy.get('[data-test=avatar-button]').click();
    cy.get('[data-test=logout]').click();

    cy.get('[data-test=nav-right]').children().should('have.length', 1);
  });

  it('changes dark-mode', () => {
    cy.get('body').should('have.class', 'chakra-ui-light');

    cy.get('[data-test=color-mode-button]').click();

    cy.get('body').should('have.class', 'chakra-ui-dark');
  });
});
