// Very basic scripts to retrieve Wp rest api posts with backbonejs



// Define Model

var Post = Backbone.Model.extend();
var Posts = Backbone.Collection.extend({
	model: Post,
	url: 'http://localhost/wordpress/wp-json/wp/v2/posts'
});


// Define View


var PostView = Backbone.View.extend({
	 tagName: "li",
	render: function(){
		this.$el.html(this.model.get("title").rendered);
		return this;
	}
});


var PostsView = Backbone.View.extend({
	render: function(){
		var self = this;
		this.model.each(function(post){
			var postView = new PostView({model: post});
			self.$el.append(postView.render().$el);
		})
	}
});

// Initialize Posts

var posts = new Posts();
posts.fetch({
	success: function(){
		// Initialize PostsView
		var postsView = new PostsView({el: "#container", model: posts });
		postsView.render();

	},
	error: function(){

	}
});
