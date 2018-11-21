<?php

////////////////////////////////////////////////////////////////
// Creates route for succinctly sending a list 
// of all published pages including templates used
////////////////////////////////////////////////////////////////
function format_categories($categories){
	$dump = [];
	foreach ($categories as $cat) {
		// Add template name to object
		$catid =  $cat->cat_ID;
		$name = array(
			'id' => $cat->cat_ID,
			'name'=> $cat->name,
			'slug' => $cat->slug,
			'parent' => $cat->category_parent,
			'media_details'=> array(
			'thumbnail' => cfix_featured_image_url( array( 'size' => 'thumbnail', 'cat_id' => $catid ) ),
			'medium' => cfix_featured_image_url( array( 'size' => 'medium', 'cat_id' => $catid ) ),
			'large' => cfix_featured_image_url( array( 'size' => 'large', 'cat_id' => $catid ) )
			)

		);

		array_push($dump, $name);
	
	 }
	 return $dump;
} 


function react_wp_rest_subcategory_by_slug($request){
	$parent = get_category_by_slug(  $request['slug'] );

	$categories = get_categories(array("hide_empty" => 0,
	"orderby"   => "name",
	"parent"     => $parent->cat_ID ) );

	return format_categories($categories);
}


function react_wp_rest_get_category_with_images() {
	$categories = get_categories(array("hide_empty" => 0,
	"type"      => "post",      
	"orderby"   => "name",
	"order"     => "ASC" ));

	return format_categories($categories);
}


function react_wp_rest_get_page_routes() {
	$pages = get_pages();
	$names = [];

	foreach ($pages as $page) {
		if ($page->post_status === 'publish') {

			// Add template name to object
			$template = get_page_template_slug( $page->ID );

			// Clean up template filename
			$template = str_replace('.php', '', $template);
			$template = str_replace('page-', '', $template);

			$name = array(
				'path' => get_page_uri($page->ID),
				'slug' => $page->post_name,
				'parent' => $page->post_parent,
				'template' => $template,
				'type' => 'page'
			);

			array_push($names, $name);
		}
	}

	return $names;
}

////////////////////////////////////////////////////////////////
// Create route for previewing post data of any post type
////////////////////////////////////////////////////////////////

function react_wp_rest_get_preview_data(WP_REST_Request $request) {

	$post = get_post_by_slug($request->get_param('slug'));

	$post_id = $post->ID;

	// Revisions are drafts so here we remove the default 'publish' status
	remove_action('pre_get_posts', 'set_default_status_to_publish');
	
	if ( $revisions = wp_get_post_revisions( $post_id, array( 'check_enabled' => false ) )) {
		$last_revision = reset($revisions);
		$rev_post = wp_get_post_revision($last_revision->ID);
		$controller = new WP_REST_Posts_Controller('post');
		$data = $controller->prepare_item_for_response( $rev_post, $request );
	} elseif ( $post = get_post( $post_id ) ) { 
		// There are no revisions, just return the saved parent post
		$controller = new WP_REST_Posts_Controller('post');
		$data = $controller->prepare_item_for_response( $post, $request );
	} else {
		return new WP_Error( 'rest_get_post_preview', 'Post ' . $post_id . ' does not exist',
			array( 'status' => 404 ) );
	}
	$response = $controller->prepare_response_for_collection( $data );
	return new WP_REST_Response($response);
}


function get_posts_by_category_slug( $request ) {
    $cat = get_category_by_slug( $request['slug'] );
    $posts = get_posts( 
        array( 
            'post_type' => 'post',
            'posts_per_page' => 10, 
    	    'category' => $cat->term_id
    	)
     );
     if ( empty( $posts ) ) {
         return [];
     }

    $controller = new WP_REST_Posts_Controller('post');

    foreach ( $posts as $post ) {
        $response = $controller->prepare_item_for_response( $post, $request );
        $data[] = $controller->prepare_response_for_collection( $response );
    }
    return rest_ensure_response( $data );

}

function get_deck_url( $object, $field_name, $request ) {
    return get_post_meta( $object[ 'id' ],"download_link",true);
}
////////////////////////////////////////////////////////////////
// Register routes
////////////////////////////////////////////////////////////////

add_action( 'rest_api_init', function () {
	register_rest_field( 'post',
	'download_link',
	array(
		'get_callback'    => 'get_deck_url',
		'update_callback' => null,
		'schema'          => null,
	)
);

	register_rest_route( 'react-wp-rest', '/subcategory/(?P<slug>[a-zA-Z0-9-]+)', array(
			'methods' => 'GET',
			'callback' => 'react_wp_rest_subcategory_by_slug',
		)
	);

	register_rest_route( 'react-wp-rest', '/posts/(?P<slug>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'get_posts_by_category_slug',
	)
);

	register_rest_route( 'react-wp-rest', '/pages/list', array(
		'methods' => 'GET',
		'callback' => 'react_wp_rest_get_page_routes',
	) );

	register_rest_route( 'react-wp-rest', '/categories/list', array(
		'methods' => 'GET',
		'callback' => 'react_wp_rest_get_category_with_images',
	
	) );
	register_rest_route( 'react-wp-rest', '/preview', array(
		'methods' => 'GET',
		'callback' => 'react_wp_rest_get_preview_data',
		'permission_callback' => function() {
			return current_user_can( 'edit_posts' );
		}
	) );
} );

?>
