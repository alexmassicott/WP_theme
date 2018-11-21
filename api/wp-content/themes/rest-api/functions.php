<?php

// Helper utilities
require_once('inc/utilities.php');

// Enable CORS from client
require_once('inc/cors.php');

// Register menu endpoints
require_once('inc/menus.php');

// Register endpoints to provide client routes
require_once('inc/routes.php');

// Register menu endpoints
require_once('inc/custom-post-types.php');

// Theme setup
require_once('inc/theme-setup.php');



function celestial_scripts() {
	// Load our main stylesheet.
	wp_enqueue_style( 'bootstrap-style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' );
	wp_enqueue_style( 'celestial-style-dist', get_stylesheet_directory_uri() . '/static/css/main.7bd4cafa.css');
	wp_enqueue_style( 'celestial-style', get_stylesheet_uri() );
    // Load scripts
	//wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.2.1.slim.min.js', '20171006', false );	
	// wp_enqueue_script( 'scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js' , array( 'jquery' ), '1.0', false );    
	//wp_enqueue_script( 'popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js', array( 'jquery' ), '20171006', false );
    //wp_enqueue_script( 'bootstrap-script', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js', array( 'jquery' ), '20171006', false );
    
    wp_enqueue_script( 'celestial-script', get_stylesheet_directory_uri() . '/static/js/main.3c596559.js' , array(), '1.0', true );
	
}
add_action( 'wp_enqueue_scripts', 'celestial_scripts' );
?>
