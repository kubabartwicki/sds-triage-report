const express = require('express')
const router = express.Router()

var Zendesk = require('zendesk-node-api');
var fs = require('fs');
var ticketData;


// Authenticate with Zendesk
var zendesk = new Zendesk({
  email: 'kuba.bartwicki@digital.cabinet-office.gov.uk',
  token: 'QiE4tWEpY2BCR8sDmry8soDjNyvBKHgJfGYBHS0v',
  url: 'https://govuk1524574066.zendesk.com/'
});

router.get('/ticket/:ticketId', function(req,res){

	// Get a ticket based on command line input id
	zendesk.tickets.show(req.params.ticketId).then(function(ticketData){

		var orgNumber = ticketData.organization_id;
		var customFields = ticketData.custom_fields;

		// Find value of custom field based on field id
		function findCustomField(zendeskFieldId) {
			for (var key in customFields) {
				if (customFields[key]['id'] == zendeskFieldId) {
					return customFields[key]['value'];
				}
			}
		}

		res.render('ticket', {
			'ticketData': ticketData,
			'findCustomField': findCustomField,
			'orgNumber': orgNumber
		})
	})

})

router.get('/', function (req, res) {
	console.log('hello')
  	res.render('index')
})

module.exports = router