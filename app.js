function attachEvents() {
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPosts = document.getElementById('btnViewPost');
    const postsSelect = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    btnLoadPosts.addEventListener('click',loadPosts);
    btnViewPosts.addEventListener('click',viewPost);
    async function loadPosts() {
        const base_URL = 'http://localhost:3030/jsonstore/blog/posts';
        postsSelect.innerHTML = '';
        const res = await fetch(base_URL);
        const data = await res.json();
        Object.entries(data).forEach(([id, post]) =>{
          const option = document.createElement('option');
          option.value = id;
          option.textContent = post.title;
          postsSelect.appendChild(option)
        });
    }
        async function viewPost() {
            const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
        const postId = postsSelect.value;
        postComments.innerHTML = '';
        const res = await fetch(postsUrl);
        const postsData = await res.json();
        const post = postsData[postId];
        postTitle.textContent = post.title;
        postBody.textContent = post.body;
         
        const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
        const commentsRes = await fetch(commentsUrl);
        const commentsData = await commentsRes.json();
        const commentsArr = Object.values(commentsData);

        const currentComments = commentsArr.filter(c=>c.postId === postId);
        currentComments.forEach(c=>{
            const li = document.createElement('li');
            li.textContent = c.text;
            li.id = c.id;
            postComments.appendChild(li);
        })
   
        }
    


}

attachEvents();