//13.18. Últimos posts (componente Card)
import { Post, PostService } from 'marcioasan-sdk';
import { useCallback, useState } from 'react';

export default function useLatestPosts() {
  const [posts, setPosts] = useState<Post.Paginated>();

  const fetchPosts = useCallback(() => {
    PostService.getAllPosts({
      sort: ['createdAt', 'desc'],
      page: 0,
      size: 3,
    }).then(setPosts);
  }, []);

  return {
    posts: posts?.content,
    fetchPosts,
  };
}
