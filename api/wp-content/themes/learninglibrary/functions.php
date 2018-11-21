<?php
function your_prefix_get_meta_box( $meta_boxes ) {
	$prefix = 'prefix-';

	$meta_boxes[] = array(
		'id' => 'untitled',
		'title' => esc_html__( 'Post Metabox', 'metabox-online-generator' ),
		'post_types' => array('post', 'page' ),
		'context' => 'advanced',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => 'download_link',
				'type' => 'text',
				'name' => esc_html__( 'Download Link', 'metabox-online-generator' ),
			),
			array(
				'id' =>  'creation_date',
				'type' => 'date',
				'name' => esc_html__( 'Creation Date', 'metabox-online-generator' ),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'your_prefix_get_meta_box' );
add_theme_support('post-thumbnails', array(
    'post',
    'page',
    'custom-post-type-name',
    ));

add_action( 'rest_api_init', 'get_category_img' );
function get_category_img() {
    register_rest_field( 'category',
        'meta',
        array(
            'get_callback'    => 'get_img_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

/**
 * Get the value of the "image" field
 *
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function get_img_url( $object, $field_name, $request ) {
    return wp_get_terms_meta( $object[ 'id' ],"image");
}

add_action( 'rest_api_init', 'get_download_link' );
function get_download_link() {
    register_rest_field( 'post',
        'download_link',
        array(
            'get_callback'    => 'get_deck_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

/**
 * Get the value of the "download_link" field
 *
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function get_deck_url( $object, $field_name, $request ) {
    return get_post_meta( $object[ 'id' ],"download_link",true);
}

add_action( 'rest_api_init', 'get_creation_date' );
function get_creation_date() {
    register_rest_field( 'post',
        'creation_date',
        array(
            'get_callback'    => 'get_date',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

/**
 * Get the value of the "download_link" field
 *
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function get_date( $object, $field_name, $request ) {
    return get_post_meta( $object[ 'id' ],"creation_date",true);
}

?>