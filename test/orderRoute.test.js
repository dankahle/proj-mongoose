
var router = require('../lib/orderRoute'),
	orderRepo = require('../lib/orderRepo'),
	app = require('../lib/index.js')



describe('orderRoute tests', function() {

	it('get', sinon.test(function() {
		this.mock(orderRepo).expects('get').calledWith()

	}))

})