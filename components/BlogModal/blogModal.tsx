import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Box, Center, Container } from '@chakra-ui/react'

import styles from './blogModal.module.css';

const BlogModal = (props) => {
  const { onClose } = useDisclosure()

  const onCloseHandler = () => {
    onClose();
    props.onCloseModal();
  }

  return (
    <Modal isOpen={true}
      onClose={onCloseHandler}
      isCentered
      motionPreset='scale'
      scrollBehavior='inside'
      size='5xl'>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)' />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box mt='1'
            fontWeight='bold'
            fontSize='52px'
            lineHeight='1.4'
            as='h1'>
            {props.blog.title}
          </Box>
          <div dangerouslySetInnerHTML={{ __html: props.blog.content }}></div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BlogModal;
