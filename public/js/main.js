$("#vote-button").click(function() {

    swal({
    title: "Enter your email to vote:",
    text: "Please enter the email and click the link sent to you to verify your vote!",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "enter your email"
}, function(inputValue) {
    if (inputValue === false) return false;
    if (inputValue === "") {
        swal.showInputError("Please enter your email");
        return false
    }

    jQuery.ajax({
        type: 'POST',
        url: 'vote',
        data: {email: inputValue},
        success:function(data, textStatus, XMLHttpRequest){
            swal("Vote succesful!", "Your vote has been cast - thank you!", "success");
        },
        error: function(MLHttpRequest, textStatus, errorThrown){
            swal("Vote failed :'()'", "Your vote could not be cast, sorry. Please try again later.", "error");
        }
    });

});

});
