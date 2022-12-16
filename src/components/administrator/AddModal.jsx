import React from 'react';
import style from './AddModal.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

// image -> base64
async function encodeImageFileAsURL(files, setPreview) {
  if (files.length === 0) {
    setPreview('');
    return;
  }
  let file = files[0];
  let reader = new FileReader();

  reader.onloadend = async function () {
    await setPreview(reader.result);
    console.log('read.result 구했음');
    return reader.result;
  };
  console.log('readAsDataURL~~');
  reader.readAsDataURL(file);
}
//

const AddModal = ({ setAddModalOpen }) => {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChangeThumbnail = async (event) => {
    const res = await encodeImageFileAsURL(event.currentTarget.files, setThumbnailPreview);
    // console.log(res);
    console.log('res', res);
    // console.log('thumbnailPreview >>', thumbnailPreview);
  };
  const onChangePhoto = (event) => {
    encodeImageFileAsURL(event.currentTarget.files, setPhotoPreview);
    console.log('photopreview >> ', photoPreview);
  };

  const onWrapperClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log('바깥 클릭');
      navigate('/admin/products');
    }
  };
  const onValid = ({ title, price, description, tags, thumbnail, photo }) => {
    // console.log(photo);
    if (thumbnailPreview === '') {
      console.log('섬네일 비어있음');
    } else {
      console.log('섬네일 존재');
    }
    if (photoPreview === '') {
      console.log('포토 비어있음');
    } else {
      console.log('포토 존재');
    }
  };
  const onInValid = (data) => {
    console.log('inValid Errors: ', errors);
  };
  // console.log(formState.errors);

  return (
    <div className={style.wrapper} onClick={onWrapperClick}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>상품 추가하기</h2>

          {/* <div> */}
          <Link to="/admin/products">
            <AiFillCloseCircle className={style.AiFillCloseCircle} />
          </Link>

          {/* </div> */}
        </div>
        <form className={style.modalBody} onSubmit={handleSubmit(onValid, onInValid)}>
          <ul className={style.inputs}>
            <li>
              <span className={style.listName}>상품명 </span>
              <input
                {...register('title', { required: '상품명은 필수입니다' })}
                type="text"
                placeholder="상품명(필수)"
              />
              <span className={style.errorMessage}>{errors?.title?.message}</span>
            </li>
            <li>
              <span className={style.listName}>가격 </span>
              <input
                {...register('price', { required: '가격은 필수입니다' })}
                type="text"
                placeholder="제품 가격(필수)"
              />
              <span className={style.errorMessage}>{errors?.price?.message}</span>
            </li>
            <li>
              <span className={style.listName}>상품설명 </span>
              <textarea {...register('description')} type="text" placeholder="상품 설명" />
            </li>
            <li>
              <span className={style.listName}>태그 </span>
              <input {...register('tags')} type="text" placeholder="제품 태그 (#으로 구분)" />
            </li>
            <li>
              <span className={style.listName}>썸네일 </span>
              <input
                {...register('thumbnail')}
                type="file"
                placeholder="썸네일 이미지"
                accept="image/*"
                onChange={onChangeThumbnail}
              />
              {thumbnailPreview === '' ? null : <img src={thumbnailPreview} className={style.preview} />}
            </li>
            <li>
              <span className={style.listName}>사진 </span>
              <input
                {...register('photo')}
                type="file"
                placeholder="제품 이미지"
                accept="image/*"
                onChange={onChangePhoto}
              />
              {photoPreview === '' ? null : <img src={photoPreview} className={style.preview} />}
            </li>
          </ul>

          <div className={style.modalFooter}>
            <button className={style.btn}>추가</button>
            <Link to="/admin/products">
              <button className={style.btn}>취소</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
