import { Box, Image } from "@chakra-ui/react";
import Moment from 'moment';

import { db, getBlogs } from '../firebase';
import Main from "components/Main/main";

import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useState } from "react";
import BlogModal from "components/BlogModal/blogModal";

const BlogPage = () => {
  // const blogs = [
  //   {
  //     id: 1,
  //     photo: 'https://bit.ly/2Z4KKcF',
  //     created_at: new Date(),
  //     title: 'Test Title',
  //     content: 'Test content',
  //     author: 'Test Author'
  //   },
  //   {
  //     id: 2,
  //     photo: 'https://bit.ly/2Z4KKcF',
  //     created_at: new Date(),
  //     title: 'Test Title 2',
  //     content: 'Test content 2',
  //     author: 'Test Author 2'
  //   },
  //   {
  //     id: 3,
  //     photo: 'https://bit.ly/2Z4KKcF',
  //     created_at: new Date(),
  //     title: 'Test Title 3',
  //     content: 'Test content 3',
  //     author: 'Test Author 3'
  //   },
  //   {
  //     id: 4,
  //     photo: 'https://bit.ly/2Z4KKcF',
  //     created_at: new Date(),
  //     title: 'Test Title 4',
  //     content: 'Test content 4',
  //     author: 'Test Author 4'
  //   },
  //   {
  //     id: 5,
  //     photo: 'https://bit.ly/2Z4KKcF',
  //     created_at: new Date(),
  //     title: 'Test Title 5',
  //     content: 'Test content 5',
  //     author: 'Test Author 5'
  //   }
  // ];
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState();

  const fetchBlogs = async () => {
    const response = db.collection('blogs');
    const data = await response.get();
    data.docs.forEach(item => {
      setBlogs(prevBlogs => {
        const updateBlogs = [...prevBlogs];
        updateBlogs.unshift(item.data());
        return updateBlogs;
      });
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onSelectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const onCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <Main additionalClass={styles.blog}>
      {
        !!selectedBlog && <BlogModal blog={selectedBlog} onCloseModal={onCloseModal} />
      }
      {
        blogs.map(item => (
          <Box className={styles.blog_item} maxW='600px' margin='10px' borderWidth='1px' borderRadius='lg' overflow='hidden' key={item.id}
            onClick={onSelectBlog.bind(null, item)}>
            <Image src={item.photo} />
            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'>
                  {Moment(item.created_at).format('d MMMM, yyyy')}
                </Box>
              </Box>

              <Box mt='1'
                fontWeight='bold'
                fontSize='30px'
                as='h1'
                isTruncated>
                {item.title}
              </Box>

              <Box display='flex' mt='2' alignItems='center'>
                <Box as='span' color='gray.600' fontSize='sm'>
                  by {item.author}
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      }
    </Main>
  );
};

export default BlogPage;
