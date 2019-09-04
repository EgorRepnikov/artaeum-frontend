import 'bootstrap/dist/css/bootstrap.css'

import './styles.css'

import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap'

import * as sapper from '@sapper/app'

sapper.start({
	target: document.querySelector('#main')
})
