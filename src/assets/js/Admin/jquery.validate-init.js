(function ($) {
    "use strict"
	
    


    jQuery(".form-valide-with-icon").validate({
        rules: {
            "val-username": {
                required: !0,
                minlength: 3
            },
            "val-password": {
                required: !0,
                minlength: 5
            }
        },
        messages: {
            "val-username": {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 3 characters"
            },
            "val-password": {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },

        ignore: [],
        errorClass: "invalid-feedback animated fadeInUp",
        errorElement: "div",
        errorPlacement: function(e, a) {
            jQuery(a).parents(".form-group > div").append(e)
        },
        highlight: function(e) {
            jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
        },
        success: function(e) {
            jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-valid")
        }
    });

})(jQuery);