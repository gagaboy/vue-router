import VueRouter from '../../src'

// define some components
var Foo = Vue.extend({
  template:
    '<div class="foo">' +
      '<h2>This is Foo!</h2>' +
      '<router-view></router-view>' + // <- nested outlet
    '</div>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>',
    route: {
	    activate: function (transition) {
	      console.log('foo/bar 已激活!')
	      //transition.next()
	      transition.redirect('/foo')
	      console.log('foo/bar 已离开!')
	    },
	    
	    deactivate: function (transition) {
	      console.log('foo/bar 取消激活!')
	      transition.next()
	    }
  }
})

var Baz = Vue.extend({
    template: '<p>This is baz!</p>'
})


// the router needs a root component to render.
// for demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({})

// create a router instance
// you can pass in additional options here, but
// let's keep it simple for now.
var router = new VueRouter({
  hashbang: false,
  abstract: false,
  history: true
})

// define some routes.
// each route should map to a component.
// we'll talk about nested routes later.
router.map({
	'/foo': {
	component: Foo,
	auth:true,
	// add a subRoutes map under /foo
	subRoutes: {
	  '/': {
	    // This component will be rendered into Foo's <router-view>
	    // when /foo is matched. Using an inline component definition
	    // here for convenience.
	    component: {
	      template: '<p>Default sub view for Foo</p>'
	    }
	  },
	  '/bar': {
	    // Bar will be rendered inside Foo's <router-view>
	    // when /foo/bar is matched
	    component: Bar,
	    auth:false
	  },
	  '/baz': {
	    // same for Baz, but only when /foo/baz is matched
	    component: Baz
	  }
	}
	},

	'/user/:username': {
		component: {
		  template: '<p>用户名是{{$route.params.username}}</p>'
		}
	},

	'/user/:username/age/:age': {
	    component: {
	      template: '<p>用户名是{{$route.params.username}}</p><p>年龄是{{$route.params.age}}</p>'
	    }
	},

	'/user/*any':{
		name:'default',
		component: {
			template: '<p>全匹配的参数是{{$route.params.any}}</p>'
		},
	},

	'/user/*any/bar':{
		component: {
			template: '<p>全匹配二的参数是{{$route.params.any}}</p>'
		},
	},

})

// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
