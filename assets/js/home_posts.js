{
	let createPost=function(){
		let newPostForm=$('#new-post-form');

		newPostForm.submit(function(e){
			e.preventDefault();

			$.ajax({
				type:'post',
				url:'/post/create',
				data:newPostForm.serialize(),
				success:function(data){
					let newPost=newPostDom(data.data.post);
					$('#posts-list-container').prepend(newPost);
					deletePost($('#delete-post-button',newPost));

					createComment(data.data.post._id);
				}, error:function(error){
					console.log(error.responseText);
				}
			});
		});
	}



	// method to create a post in Dom
	let newPostDom=function(post){
			return $(` <li id="post-${post._id}">
                <p>
                <small>
                <a href="/post/distroy/${post._id}" id"delete-post-button">X</a>
                </small>   
                   ${post.content}
                    <br>
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                
            </li>`)
	}

	//method to delete a post 
	let deletePost = function(deleteLink){
		$(deleteLink).click(function(e){
			e.preventDefault();

			$.ajax({
				type:'get',
				url:$(deleteLink).prop('href'),
				success:function(data){
					$(`#post-${data.data.post_id}`).remove();
				},error:function(error){
					console.log(error.responseText);
				}
			})
		})
	}
	
	let createComment=function(postId){
		newCommentForm=$('#new-comment-form');
		newCommentForm.submit(function(e){
			e.preventDefault();

			$.ajax({
				type:'POST',
				url:'/comments/create',
				data:newCommentForm.serialize(),
				success:function(data){
					let newCommentAdd=newCommentDom(data.data.comment);
					$(`post-comments-${postId}`).prepend(newCommentAdd);
				},
				error:function(error){
					console.log(error.responseText);
				}
			})
		})
	}

let newCommentDom=function(comment){
return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>    

                </li>`);
}

	createPost();
	createComment();
}