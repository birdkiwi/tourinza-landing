module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {"css/style.css": "css/style.less"}
            },
            production: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {"css/style.css": "css/style.less"}
            }
        },

        cssmin: {
            combine: {
                files: {
                    'css/master.min.css': ['css/style.css']
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'js/jquery.js',
                    'js/wow.js',
                    'js/hoverintent.js',
                    'js/app.js'
                ],
                dest: 'js/build/production.js'
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        sprite:{
            all: {
                src: 'img/spriteTo/*.png',
                destImg: 'img/sprites/spritesheet.png',
                destCSS: 'css/ui-sprites.less'
            }
        },


        watch: {
            scripts: {
                files: ['js/*.js', 'img/spriteTo/*', 'css/*.less'],
                tasks: ['less', 'cssmin', 'concat', 'uglify', 'sprite'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'concat', 'uglify', 'sprite','watch']);

};