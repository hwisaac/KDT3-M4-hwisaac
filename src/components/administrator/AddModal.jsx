import React from 'react';
import style from './AddModal.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { addProduct, encodeImageFileAsURL } from '../../data/API';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { myAtom } from '../../data/atoms.js';
import LoadingModal from '../loading/LoadingModal';

const AddModal = () => {
  const atom = useRecoilValue(myAtom);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const postProduct = useMutation((payload) => addProduct(payload), {
    // 성공하면 닫고 데이터 refetch
    onSuccess: () => {
      navigate('/admin/products');
      atom.myFn(); // refetch 함수
    },
  });

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
  /** submit 이 유효한 경우 작동하는 함수. (handleSubmit에 등록돼 있다.)  */
  const onValid = async ({ title, price, description, thumbnail, photo }) => {
    // console.log(tags);
    // thumbnailPreview
    navigate('/admin/products');
    postProduct.mutate({
      title,
      price: Number(price),
      description,
      tags,
      thumbnailBase64: thumbnailPreview,
      photoBase64: photoPreview,
    });
    // const res = await addProduct();
  };
  const onInValid = (data) => {
    console.log('inValid Errors: ', errors);
  };
  // console.log(formState.errors);

  return (
    <div className={style.wrapper} onClick={onWrapperClick}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>New Product</h2>
          {postProduct.isLoading ? <LoadingModal /> : null}
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
              <input
                {...register('title', { required: '상품명은 필수입니다.' })}
                type="text"
                placeholder="상품명(필수)"
              />
              <span className={style.errorMessage}>{errors?.title?.message}</span>
            </li>
            <li>
              <span className={style.listName}>가격 *</span>
              <input
                {...register('price', { required: '가격은 필수입니다.' })}
                type="number"
                placeholder="제품 가격(필수)"
              />
              <span className={style.errorMessage}>{errors?.price?.message}</span>
            </li>
            <li>
              <span className={style.listName}>상품설명 *</span>
              <textarea
                {...register('description', { required: '상품설명은 필수입니다.' })}
                type="text"
                placeholder="상품 설명(필수)"
              />
              <span className={style.errorMessage}>{errors?.description?.message}</span>
            </li>
            <li>
              <span className={style.listName}>태그 </span>

              <input
                className={style.tagInput}
                {...register('tag')}
                type="text"
                value={tagValue}
                onChange={onChangeTagValue}
                placeholder="쉼표(,) 혹은 샵(#)으로 구분"
              />

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
            <li className={style.files}>
              <div>
                <span className={style.listName}>썸네일 </span>
                <div class={style.fileContainer}>
                  <input
                    {...register('thumbnail', {
                      onChange: onChangeThumbnail,
                      validate: (files) => {
                        if (files[0]?.size > 1000000) {
                          return `1MB 이하여야 합니다.(현재:${(files[0]?.size / 1000000).toFixed(2)}MB)`;
                        } else {
                          return true;
                        }
                      },
                    })}
                    type="file"
                    placeholder="썸네일 이미지"
                    accept="image/*"
                    id="add-thumbnail"
                  />
                  <label for="add-thumbnail" class={style.findFile}>
                    파일찾기
                  </label>
                  {thumbnailPreview === '' ? null : <img src={thumbnailPreview} className={style.preview} />}
                </div>

                <span className={style.sizeError}>{errors?.thumbnail?.message}</span>
              </div>
              <div>
                <span className={style.listName}>사진 </span>
                <div class={style.fileContainer}>
                  <input
                    {...register('photo', {
                      onChange: onChangePhoto,
                      validate: (files) => {
                        if (files[0]?.size > 4000000) {
                          return `4MB 이하여야 합니다.(현재:${(files[0]?.size / 4000000).toFixed(2)}MB) `;
                        } else {
                          return true;
                        }
                      },
                    })}
                    type="file"
                    placeholder="제품 이미지"
                    accept="image/*"
                    id="add-photo"
                  />
                  <label for="add-photo" class={style.findFile}>
                    파일찾기
                  </label>
                  {photoPreview === '' ? null : <img src={photoPreview} className={style.preview} />}
                </div>

                <span>{errors?.photo?.message}</span>
              </div>
            </li>
          </ul>

          <div className={style.modalFooter}>
            <button className={style.btn}>추가</button>
            <Link to="/admin/products">
              <button className={style.btn + ' ' + style.gray}>취소</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
