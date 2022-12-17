import React from 'react';
import style from './EditModal.module.css';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { addProduct, encodeImageFileAsURL } from '../../data/API';

const EditModal = () => {
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  console.log('parmas: ', id);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onChangeTagValue = (event) => {
    let value = event.currentTarget.value;
    setTagValue(value);

    const tags = value
      .replaceAll('#', ',')
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    setTags([...tags]);
  };
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
      navigate('/admin/products');
    }
  };
  const onValid = async ({ title, price, description, thumbnail, photo }) => {
    // console.log(tags);
    // thumbnailPreview

    navigate('/admin/products');
    const res = await addProduct({
      title,
      price: Number(price),
      description,
      tags,
      thumbnailBase64: thumbnailPreview,
      photoBase64: photoPreview,
    });
    console.log('onValid에서의 res: ', res);
  };
  const onInValid = (data) => {
    console.log('inValid Errors: ', errors);
  };
  // console.log(formState.errors);

  return (
    <div className={style.wrapper} onClick={onWrapperClick}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>상품 수정하기</h2>

          {/* <div> */}
          <Link to="/admin/products">
            <AiFillCloseCircle className={style.AiFillCloseCircle} />
          </Link>

          {/* </div> */}
        </div>
        <form className={style.modalBody} onSubmit={handleSubmit(onValid, onInValid)}>
          <ul className={style.inputs}>
            <li>
              <span className={style.listName}>상품명 *</span>
              <input {...register('title')} type="text" placeholder="상품명" />
            </li>
            <li>
              <span className={style.listName}>가격</span>
              <input {...register('price')} type="number" placeholder="제품 가격" />
            </li>
            <li>
              <span className={style.listName}>상품설명</span>
              <textarea {...register('description')} type="text" placeholder="상품 설명" />
            </li>
            <li>
              <span className={style.listName}>태그 </span>
              <div>
                <input
                  className={style.tagInput}
                  {...register('tag')}
                  type="text"
                  value={tagValue}
                  onChange={onChangeTagValue}
                />
              </div>

              <div className={style.tagContainer}>
                {tags.length > 0
                  ? tags.map((tag, index) => (
                      <span className={style.tagItem} key={`${tag}${index}`}>
                        {tag}
                      </span>
                    ))
                  : null}
              </div>
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
            <button className={style.btn}>수정</button>
            <Link to="/admin/products">
              <button className={style.btn}>취소</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
