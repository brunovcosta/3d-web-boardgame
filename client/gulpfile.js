var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var paths = {
    pages: ["src/*.html"]
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: [
			"src/app/main.ts"
		],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("server",function(){
	var express = require("express"),
		path = require("path"),
		app = express();

	app.use(express.static("dist"));

	app.get("*", function(req, res, next) {
		res.sendFile("index.html", { root: path.join(__dirname, "dist") });
	});

	console.log("Listening to port 8080");
	app.listen(8080);
});

gulp.task("watch",function(){
	gulp.watch(["src/**/*"],["default"]);
});

gulp.task("dev",["default","watch","server"]);
