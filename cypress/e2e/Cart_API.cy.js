import product_non_eligible from '../fixtures/product_non_eligible.json'
import product_eligible from '../fixtures/product_eligible.json'
import 'cypress-iframe'
describe('Technical Test Cart API', function() {
  var mobileUrl

  beforeEach('List of product not eligible', function(){
    cy.fixture('product_non_eligible.json')
    .then(product_non_eligible => {
            this.product_non_eligible = product_non_eligible
        })
    
    cy.fixture('product_eligible.json')
    .then(product_eligible => {
        this.product_eligible = product_eligible
      })
  })

  it('Wrong cart', () => {
    cy.request({
      method : 'POST',
      url : 'https://api.luckycart.com/cart/ticket',
      failOnStatusCode : false,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{
        "cartId": "not_eligible_test_1",
        "totalAti": 30.00,
        "shopperId": "not_eligible_test_1",
        "shopperEmail": "not_eligible_test_1@luckycart.com",
        "auth_v": "2.01",
        "auth_key": "tVIoa1S61",
        "auth_ts": "16409916001",
        "auth_sign": "c723c649c389d68d8ab3feb4f53875f7f7eb87d27ec575f1f06a66e3dae4dc30"
    }
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('Cart not eligible', function() {
    cy.request({
      method : 'POST',
      url : 'https://api.luckycart.com/cart/ticket',
      failOnStatusCode : false,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{
        "cartId": `${this.product_non_eligible.cartId}_${cy.getRandomInt(100)}`,
        "totalAti": this.product_non_eligible.totalAti,
        "shopperId": this.product_non_eligible.shopperId,
        "shopperEmail": "not_eligible_test_1@luckycart.com",
        "auth_v": "2.0",
        "auth_key": "tVIoa1S6",
        "auth_ts": "1640991600",
        "auth_sign": "c723c649c389d68d8ab3feb4f53875f7f7eb87d27ec575f1f06a66e3dae4dc30"
    }
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.log(response.body)
    })
  })

  it('Cart eligible', function() {
    cy.request({
      method : 'POST',
      url : 'https://api.luckycart.com/cart/ticket',
      failOnStatusCode : false,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{
        "cartId": `${this.product_eligible.cartId}_${cy.getRandomInt(100)}`,
        "totalAti": this.product_eligible.totalAti,
        "shopperId": this.product_eligible.shopperId,
        "shopperEmail": "eligible_test_1@luckycart.com",
        "auth_v": "2.0",
        "auth_key": "tVIoa1S6",
        "auth_ts": "1640991600",
        "auth_sign": "c723c649c389d68d8ab3feb4f53875f7f7eb87d27ec575f1f06a66e3dae4dc30"
    }
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.log(response.body)
      mobileUrl = response.body.mobileUrl
    })
  })

  it('Game', () => {
    cy.log(mobileUrl)
    cy.visit(mobileUrl)
    cy.frameLoaded('.lc-iframe')
    cy.iframe('.lc-iframe').find('.sc-gsnTZi').contains('Welcome to QA Game!')

    cy.iframe('.lc-iframe').find('.sc-bczRLJ').should('exist')
    cy.iframe('.lc-iframe').find('.sc-bczRLJ').click()

   // cy.iframe('.lc-iframe').find('#body').contains('Spin the QA wheel to win nothing.')
    cy.wait(30000)

    cy.iframe('.lc-iframe').find('.sc-gsnTZi').contains('Congrats, you won nothing!')
  })
})