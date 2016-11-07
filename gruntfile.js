module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			pre: ['dev'],
			post: ['.posts-cache']
		},
		copy: {
			pre: {
				files: [
					{
						expand: true,
						cwd: 'src/theme/',
						src: ['**/*'],
						dest: 'dev/'
					},
					{
						expand: true,
						cwd: 'src/plugins/',
						src: ['**/*'],
						dest: 'dev/_plugins/'
					},
					{
						expand: true,
						cwd: 'src/content/',
						src: ['**/*.md', '**/*.html', '!_posts/**'],
						dest: 'dev/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/content/',
						src: ['**/*.{png,jpg,svg}', '!_posts/**/*.{png,jpg,svg}'],
						dest: 'dev/assets/img/pages/',
						filter: 'isFile',
						rename: function(dest, src) {
							return dest + src;
						}
					},
					{
						expand: true,
						cwd: 'src/content/_posts',
						src: ['**/*.md'],
						dest: '.posts-cache/',
						filter: 'isFile',
						rename: function(dest, src) {
							return dest + src.substring(0, src.indexOf('/')) + '.md';
						}
					},
					{
						expand: true,
						cwd: 'src/content/_posts',
						src: ['**/*.{png,jpg,svg}'],
						dest: 'dev/assets/img/posts/',
						filter: 'isFile',
						rename: function(dest, src) {
							return dest + src.substring(0, src.indexOf('/')) + "-" + src.substring(src.indexOf('/')+1, src.length);
						}
					}
				],
				options: {
					noProcess: ['**/*.{png,jpg,svg,pdf,xml,psd}'],
					process: function(content, srcpath) {
						
						var img_regex = /[^`]!\[.*?\]\(([^\/].[^\/]*?)\)/gm,
							date_regex = /^date:\s*([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9])/gm,
							prependSrc = "{{ site.url }}/assets/img/",
							new_content = "";
						
						if(srcpath.slice(srcpath.length-3, srcpath.length) === ".md") {
							
							var src = srcpath.slice(12);
							
							if (src.indexOf('/') > 0) {
							
								if (srcpath.indexOf('_posts') > 0) {
									
									var post_folder = src.slice(7, src.indexOf('index.md')-1),
										matches,
										matchIndex = 0;
										
									do {
										matches = img_regex.exec(content);
										if (matches) {
											// console.log(matches[0] + ", " + matches[1] + ", " + matches.index);
											
											var indexStart = parseInt(matches.index) + parseInt(matches[0].indexOf(matches[1]));
											matchIndex++;
											
											content = content.slice(0, indexStart) + "{{ site.url }}/assets/img/posts/" + post_folder + "-" + content.slice(indexStart);
											
										}
										
									} while (matches);
																		
								} else {
									var folder = src.slice(0, src.indexOf('index.md')),
										matches,
										matchIndex = 0;
										
									do {
										matches = img_regex.exec(content);
										if (matches) {
											
											var indexStart = parseInt(matches.index) + parseInt(matches[0].indexOf(matches[1]));
											matchIndex++;
											
											content = content.slice(0, indexStart) + "{{ site.url }}/assets/img/pages/" + folder + content.slice(indexStart);
											
										}
										
									} while (matches);
								}
							
							}
							
						} else {
							
						}
						
						return content;
					}
				}
			},
			post: {
				files: [
					{
						expand: true,
						cwd: '.posts-cache/',
						src: ['**/*.md'],
						dest: '.posts-cache',
						filter: 'isFile'
					}
				]
			},
			options: {
				noProcess: ['**/*.{png,jpg,svg,pdf,xml,psd}'],
				process: function(content, srcpath) {
					
					var filename = srcpath.slice('.posts-cache/'.length),
						date_regex = /^date:\s*([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9])/gm,
						dateRegexOutput = date_regex.exec(content)[1];
					
					destpath = 'dev/_posts/' + dateRegexOutput + '-' + filename;
					
				}
			}
		},
		watch: {
			content: {
				files: ['src/**/*'],
				tasks: ['default'],
				options: {
					spawn: false,
					reload: true,
					interrupt: false
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['clean:pre', 'copy:pre', 'copy:post', 'clean:post']);
	
};