module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		connect: {
			server: {
				options: {
	                open: true,
	                livereload: true
				}
			}
	    },
        uglify: {
            js: {
                files: {
                    'assets/js/main.min.js': 'assets/js/main.js'
                }
            }
        },	    
		less: {
			style: {
				files: {
					'assets/css/main.min.css': 'assets/less/main.less'
				}
			}
		},
		autoprefixer: {
			main: {
				src: 'assets/css/main.min.css',
			},
		},
		jade: {
			dist: {
				options: {
					data: function() {
						return {
							blog_posts: require( __dirname + '/assets/data/blog-posts.json')
						}
					}
				},
				files: {
					"index.html": "assets/templates/index.jade",
					"blog-post.html": "assets/templates/blog-post.jade"
				}
			}
		},
		markdown: {
			home: {
				files: {
					"index.html": "assets/data/content.md"					
				},
				options: {
					template: 'index.html'
				}
			},
			blog: {
				files: [{
					expand: true,
					cwd: 'assets/data/blog-posts/',
					src: '*.md',
					dest: 'blog-posts/',
					ext: '.html'
		        }],
				options: {
					template: 'blog-post.html'
				}
			}
		},
		watch: {
			js: {
				files: [ 'assets/js/main.js' ],
				tasks: [ 'uglify:js' ],
				options: {
					livereload: true,
				}
			},
			css: {
				files: [ 'assets/less/*.less' ],
				tasks: [ 'less:style', 'autoprefixer:main' ],
				options: {
					livereload: true,
				}
			},
			data: {
				files: [ 
					'assets/templates/**/*.jade', 
					'assets/data/**/*.json', 
					'assets/data/**/*.md' 
				],
				tasks: [ 'jade', 'markdown' ],
				options: {
					livereload: true,
				}				
			}
		}
    });

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-markdown');

	grunt.registerTask('serve', [
		'uglify:js',
		'less:style',
		'autoprefixer:main',
		'jade',
		'markdown',
		'connect',
		'watch'
	]);
	
	// Default task.
	grunt.registerTask('default', 'serve');

};
