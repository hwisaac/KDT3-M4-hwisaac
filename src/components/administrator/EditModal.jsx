import React from 'react';
import style from './EditModal.module.css';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { addProduct, encodeImageFileAsURL, getProductDetail, getProducts, updateProduct } from '../../data/API';
import { useQuery } from '@tanstack/react-query';

const EditModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data } = useQuery([id], () => getProductDetail(id));
  const [tags, setTags] = useState([]);
  // const [tagValue, setTagValue] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const onChangeTagValue = (event) => {
    let value = event.currentTarget.value;
    // let value = watch().tag;
    setValue('tag', value);
    // setTagValue(value);

    const tags = value
      .replaceAll('#', ',')
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    setTags([...tags]);
  };
  const onChangeThumbnail = async (event) => {
    const res = await encodeImageFileAsURL(event.currentTarget.files, setThumbnailPreview);
    console.log('res', res);
    // console.log('thumbnailPreview >>', thumbnailPreview);
    setValue('thumbnail', event.currentTarget.files);
  };
  const onChangePhoto = async (event) => {
    const res = await encodeImageFileAsURL(event.currentTarget.files, setPhotoPreview);
    console.log('photo로 setvalue 한 값은: ', event.currentTarget.files);
    // console.log('photopreview >> ', photoPreview);
    setValue('photo', event.currentTarget.files);
  };

  const onWrapperClick = (event) => {
    if (event.target === event.currentTarget) {
      navigate('/admin/products');
    }
  };
  /**
   *
   * @param data
   */
  const onValid = async ({ title, price, description, tag, thumbnail, photo, isSoldOut }) => {
    // { title, price, description, thumbnail, photo }
    let tags = tag
      .replaceAll('#', ',')
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    console.log('현재 더티필드', dirtyFields);
    console.log('data{} = ', { title, price, description, tag, thumbnail, photo, isSoldOut });
    // let ept = ''
    // const testObj = { t: epy ? 'yes' : undefined };
    // console.log(testObj);
    // console.log( `  ${dirtyFields.photo? }   `)
    updateProduct(id, {
      title,
      price,
      description,
      tags,
      thumbnailBase64: thumbnailPreview,
      photoBase64: photoPreview,
      isSoldOut,
    });
  };
  const onInValid = (result) => {
    console.log('inValid Errors: ', errors);
  };
  // console.log(formState.errors);
  // console.log('watch:', watch());
  useEffect(() => {
    setValue('description', data?.description);
    setValue('title', data?.title);
    setValue('price', data?.price);
    setValue('tag', data?.tags.join(', '));
    setValue('isSoldOut', data?.isSoldOut);
    // console.log('data.tags >>> ', data?.tags);
    if (data?.tags) {
      setTags(data?.tags);
    }
  }, [isLoading]);

  return (
    <div className={style.wrapper} onClick={onWrapperClick}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>{isLoading ? '' : data?.title}</h2>
          <Link to="/admin/products">
            <AiFillCloseCircle className={style.AiFillCloseCircle} />
          </Link>
        </div>
        <form className={style.modalBody} onSubmit={handleSubmit(onValid, onInValid)}>
          <ul className={style.inputs}>
            <li>
              <span className={style.listName}>상품명 *</span>
              <input {...register('title')} type="text" placeholder="상품명" />
            </li>
            <li>
              <span className={style.listName}>가격</span>
              <input {...register('price', { valueAsNumber: true })} type="number" placeholder="제품 가격" />
            </li>
            <li>
              <span className={style.listName}>상품설명</span>
              <textarea {...register('description')} type="text" placeholder="상품 설명" />
            </li>
            <li>
              <span className={style.listName}>태그 </span>
              <div>
                <input className={style.tagInput} {...register('tag', { onChange: onChangeTagValue })} type="text" />
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
                {...register('thumbnail', { onChange: onChangeThumbnail })}
                type="file"
                placeholder="썸네일 이미지"
                accept="image/*"
              />
              {thumbnailPreview === '' ? null : <img src={thumbnailPreview} className={style.preview} />}
            </li>
            <li>
              <span className={style.listName}>사진 </span>
              <input
                {...register('photo', { onChange: onChangePhoto })}
                type="file"
                placeholder="제품 이미지"
                accept="image/*"
              />
              {photoPreview === '' ? null : <img src={photoPreview} className={style.preview} />}
            </li>
            <li>
              <span className={style.listName}>매진유무 </span>
              <input {...register('isSoldOut')} type="checkbox" />
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
