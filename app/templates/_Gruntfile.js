// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var LIVERELOADPORT = 35729;
var connectLl = require('connect-livereload')({
    port: LIVERELOADPORT
});

var connectDir = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // configurable paths
    var yeomanConfig = {
        app: 'app',
        tmp: '.tmp',
        dist: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        //fire up livereload and open site in browser
        connect: {
            options: {
                port: 9000,
                // change localhost to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connectLl,
                            connectDir(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            connectDir(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        // watch files for changes
        watch: {
            sass: {
                files: '<%=yeoman.app %>/css/**/*.scss',
                tasks: ['sass', 'autoprefixer']
            },
            scripts: {
                files: ['<%=yeoman.app %>/js/**/*.js'],
                tasks: ['jshint', 'concat']
            },
            livereload: {
                options: {
                    livereload: LIVERELOADPORT
                },
                files: [
                    '<%=yeoman.app %>/{,*/}*.html',
                    '<%=yeoman.app %>/css/{,*/}*.css',
                    '<%=yeoman.app %>/js/{,*/}*.js',
                    '<%=yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif}'
                ]
            }
        },
        // Sass options
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    lineNumbers: true
                },
                files: {
                    // 'destination': 'source'
                    '<%= yeoman.app %>/css/style.css': '<%= yeoman.app %>/css/style.scss'
                }
            }
        },
        // post process css3 vendor prefixes from canIuse.com
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            // prefix the specified file
            single_file: {
              expand: true,
              flatten: true,
              src: '<%= yeoman.app %>/css/style.css',
              dest: '<%= yeoman.app %>/css/'
            }
        },
        // minify css
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> stylesheet <%= grunt.template.today("yyyy-mm-dd") %> */',
                report: 'min'
            },
            minify: {
                expand: true,
                cwd: '<%= yeoman.app %>/css',
                src: ['*.css'],
                dest: '<%= yeoman.dist %>/css/',
                ext: '.css'
            }
        },
        // optimise images
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img/',
                    src: ['**/*.png'],
                    dest: '<%= yeoman.dist %>/img/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img/',
                    src: ['**/*.jpg'],
                    dest: '<%= yeoman.dist %>/img/',
                    ext: '.jpg'
                }]
            },
            gif: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img/',
                    src: ['**/*.gif'],
                    dest: '<%= yeoman.dist %>/img/',
                    ext: '.gif'
                }]
            }
        },
        // Lint JS files for errors
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                '<%= yeoman.app %>/js/src/*.js'
            ]
        },
        // concat plugins and devscripts into one almighty!!!
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '<%= yeoman.app %>/js/src/plugins.js',
                    '<%= yeoman.app %>/js/src/main.js'
                ],
                dest: '<%= yeoman.app %>/js/scripts.js',
            },
        },
        // minify js
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> */\n'
                },
                files: {
                    '<%= yeoman.dist %>/js/scripts.js': ['<%= yeoman.app %>/js/scripts.js']
                }
            }
        },
        // cleanup build assets
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.dist %>/*'
                    ]
                }]
            },
            temp: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.tmp %>/*'
                    ]
                }]
            }
        },
        // Run multiple grunt tasks at once
        concurrent: {
            serve: [
                'jshint',
                'sass'
            ],
            dist: [
                'jshint',
                'sass',
                'imagemin',
                'copy'
            ]
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '{,*/}*.html',
                        '/fonts/{,*/}*.*',
                        '/js/vendors/*.min.js',
                        '*.{ico,png,txt}',
                        '.htaccess'
                    ]
                }]
            }
        }

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'concurrent:serve',
            'autoprefixer',
            'concat',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('build', [
        'clean',
        'concurrent:dist',
        'autoprefixer',
        'cssmin',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', ['build']);
};