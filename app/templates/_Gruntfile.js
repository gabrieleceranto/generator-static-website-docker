module.exports = function(grunt) {
	grunt.initConfig({
		projectname: '<%- name %>',
		
		'compile-handlebars': {
			dist: {
				files: [
					{'site/*.html': 'src/html/*.handlebars'},
				],
				partials: 'src/html/*.hbs',
				templateData: {
					title: '<%%= projectname %>'
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', ['<%%= concat.dist.src %>']],
			options: {
				globals: {
					jQuery: true,
					console: true,
					document: true
				}
			}
		},
		<% if(css_engine === 'less') { %>
		less: {
			devel: {
				options: {
					paths: ["src/less"]
				},
				files: {
					'site/css/site.css': ['<%%= less.devel.options.paths[0] %>/site.less']
				}
			}
		},
		<% } else { %>
		sass: {
			devel: {
				options: {
					loadPath: ["src/scss"]
				},
				files: {
					'site/css/site.css': ['<%%= sass.devel.options.loadPath[0] %>/site.scss']
				}
			}
		},
		<% } %>
		cssmin: {
			dist: {
				src: 'site/css/site.css',
				dest: 'site/css/site.min.css'
			}
		},
		concat: {
			dist: {
				src: [
					'src/js/site.js'
				],
				dest: 'site/js/site.js'
			}
		},
		watch: {
			files: ['<%%= jshint.files %>', '<%%= <%- css_engine %>.devel.options.paths[0] %%>>/*', 'src/html/*'],
			tasks: ['default']
		},
		uglify: {
			options: {
				banner: '/*! <%%= projectname %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'site/js/site.min.js': ['<%%= concat.dist.dest %>']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-<%- css_engine %>');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	
	grunt.registerTask('default', ['compile-handlebars', 'jshint', 'concat', 'uglify', '<%- css_engine %>', 'cssmin']);
};
