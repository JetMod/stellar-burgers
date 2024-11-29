import { URL } from '@api';
import { deleteCookie, setCookie } from '../../src/utils/cookie';

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI...');
    localStorage.setItem('refreshToken', '9cbdd5b777...');

    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as(
      'orderBurgerApi'
    );

    cy.visit('http://localhost:4000');
    cy.wait('@getUser', { timeout: 10000 }); // Ждем, пока запрос на получение пользователя завершится
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Получение и отображение списка ингредиентов', () => {
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]').as('modal');

    cy.get('@modal').should('exist').and('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('@modal').should('exist');
    cy.get('[data-cy="modal-overlay"]').click('left', { force: true });
    cy.get('@modal').should('not.exist');
  });

  it('Создание заказа и проверка номера', () => {
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').find('button').contains('Оформить заказ').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist').and('contain', '60862');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');
    cy.get('@constructor').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );

    cy.wait('@orderBurgerApi');
  });
});
