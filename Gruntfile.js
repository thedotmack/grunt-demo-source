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
            options: {
                mangle: true,
                compress: true,
                preserveComments: 'some',
                sourceMap: true,
            },
            js: {
                files: {
                    'assets/js/main.min.js': 'assets/js/main.js'
                }
            }
        },	    
		less: {
			options: {
				compress: true,
				yuicompress: true,
				optimization: 2,
				sourceMap: true
			},
			style: {
				files: {
					'assets/css/main.min.css': 'assets/less/main.less'
				}
			}
		},
		autoprefixer: {
			options: {
				map: true,
			},
			main: {
				src: 'assets/css/main.min.css',
			},
		},
		jade: {
			dist: {
				options: {
					data: function() {
						return {
							pictures: require( __dirname + '/assets/data/pictures.json')
						}
					}
				},
				files: {
					"index.html": "assets/templates/index.jade",
				}
			}
		},
		markdown: {
			all: {
				files: {
					"index.html": "assets/data/content.md",
				},
				options: {
					template: 'index.html'
				}
			}
		},
		watch: {
			js: {
				files: [ 'assets/js/*.js' ],
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
					'assets/templates/*.jade', 
					'assets/data/*.json', 
					'assets/data/*.md' 
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-markdown');

	// Default task.
	grunt.registerTask('serve', ['connect','watch']);

};
