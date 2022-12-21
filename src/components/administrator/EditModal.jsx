import React from 'react';
import style from './EditModal.module.css';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { addProduct, encodeImageFileAsURL, getProductDetail, getProducts, updateProduct } from '../../data/API';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myAtom } from '../../data/atoms.js';
import LoadingModal from '../loading/LoadingModal.jsx';

const EditModal = () => {
  const atom = useRecoilValue(myAtom);

  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data } = useQuery([id], () => getProductDetail(id));
  const editProduct = useMutation(([id, payload]) => updateProduct(id, payload), {
    // 성공하면 닫고 데이터 refetch
    onSuccess: () => {
      navigate('/admin/products');
      atom.myFn(); // refetch 함수
    },
  });

  // const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);
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

    // console.log('thumbnailPreview >>', thumbnailPreview);
    // setValue('thumbnail', event.currentTarget.files);
  };
  const onChangePhoto = async (event) => {
    const res = await encodeImageFileAsURL(event.currentTarget.files, setPhotoPreview);
    // console.log('photo로 setvalue 한 값은: ', event.currentTarget.files);
    // console.log('photopreview >> ', photoPreview);
    // setValue('photo', event.currentTarget.files);
  };

  const onWrapperClick = (event) => {
    if (event.target === event.currentTarget) {
      navigate('/admin/products');
    }
  };
  /**
   * @param payload 상품 데이터
   * @param { string } payload.title 제품명
   * @param { number } payload.price 제품가격
   * @param { string } payload.description 제품설명
   * @param { string[] } payload.tag 태그
   * @param { string } payload.thumbnail  섬네일이미지 url
   * @param { string } payload.photo 사진이미지 url
   * @param { boolean } payload.isSoldOut 매진유무
   * @return {void}
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

    // console.log( `  ${dirtyFields.photo? }   `)
    editProduct.mutate([
      id,
      {
        title,
        price,
        description,
        tags,
        thumbnailBase64: thumbnailPreview,
        photoBase64: photoPreview,
        isSoldOut,
      },
    ]);
  };
  const onInValid = (result) => {
    console.log('inValid Errors: ', errors);
  };
  // console.log(formState.errors);
  // console.log('watch:', watch('thumbnail'));
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
          <h2 className={style.headTitle}>Edit Product</h2>
          {editProduct.isLoading ? <LoadingModal /> : null}
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

              <input //
                className={style.tagInput}
                {...register('tag', { onChange: onChangeTagValue })}
                type="text"
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
                          return `1MB 이하여야 합니다.(현재:${(files[0]?.size / 1000000).toFixed(2)}MB) `;
                        } else {
                          return true;
                        }
                      },
                    })}
                    type="file"
                    placeholder="썸네일 이미지"
                    accept="image/*"
                    id="edit-thumbnail"
                  />
                  <label for="edit-thumbnail" class={style.findFile}>
                    파일찾기
                  </label>
                  {thumbnailPreview === '' ? null : <img src={thumbnailPreview} className={style.preview} />}
                </div>

                <span class={style.sizeError}>{errors?.thumbnail?.message}</span>
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
                    id="edit-photo"
                  />
                  <label for="edit-photo" class={style.findFile}>
                    파일찾기
                  </label>
                  {photoPreview === '' ? null : <img src={photoPreview} className={style.preview} />}
                  {/* <img src={photoPreview === '' ? photoPreview : null} className={style.preview} /> */}
                </div>

                <span className={style.sizeError}>{errors?.photo?.message}</span>
              </div>
            </li>
            <li className={style.isSoldOut}>
              <span className={style.listName}>매진유무</span>
              <input {...register('isSoldOut')} type="checkbox" />
            </li>
          </ul>

          <div className={style.modalFooter}>
            <button className={style.btn}>수정</button>
            <Link to="/admin/products">
              <button className={style.btn + ' ' + style.gray}>취소</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
