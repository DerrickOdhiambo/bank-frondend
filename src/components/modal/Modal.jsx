import { useState, forwardRef, useImperativeHandle } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import './Modal.scss';

const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='modal__backdrop'
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ scale: 0 }}
            className='modal__content__wrapper'
          >
            <motion.div className='modal__content'>{props.children}</motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default Modal;
