import React from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { addProduct, encodeImageFileAsURL, getProductDetail, getProducts, updateProduct } from '../../api/productApi';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myAtom } from '../../recoil/atoms';
import LoadingModal from '../ui/loading/LoadingModal';
import styled from 'styled-components';

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
    <Wrapper onClick={onWrapperClick}>
      <Modal>
        <ModalHeader>
          <h2 className="headTitle">Edit Product</h2>
          {editProduct.isLoading ? <LoadingModal /> : null}
          <Link to="/admin/products">
            <AiFillCloseCircle style={{ color: 'var(--color-light-indigo)', fontSize: '20px' }} />
          </Link>
        </ModalHeader>
        <ModalBody onSubmit={handleSubmit(onValid, onInValid)}>
          <ul className="inputs">
            <li>
              <span className="listName">상품명 *</span>
              <input {...register('title')} type="text" placeholder="상품명" />
            </li>
            <li>
              <span className="listName">가격</span>
              <input {...register('price', { valueAsNumber: true })} type="number" placeholder="제품 가격" />
            </li>
            <li>
              <span className="listName">상품설명</span>
              <textarea {...register('description')} type="text" placeholder="상품 설명" />
            </li>
            <li>
              <span className="listName">태그 </span>

              <input //
                className="tagInput"
                {...register('tag', { onChange: onChangeTagValue })}
                type="text"
                placeholder="쉼표(,) 혹은 샵(#)으로 구분"
              />

              <TagContainer>
                {tags.length > 0
                  ? tags.map((tag, index) => (
                      <span className="tagItem" key={`${tag}${index}`}>
                        {tag}
                      </span>
                    ))
                  : null}
              </TagContainer>
            </li>
            <li className="files">
              <div>
                <span className="listName">썸네일 </span>
                <div className="fileContainer">
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
                  <label htmlFor="edit-thumbnail" className="findFile">
                    파일찾기
                  </label>
                  {thumbnailPreview === '' ? null : <Preview src={thumbnailPreview} />}
                </div>

                <span className="sizeError">{errors?.thumbnail?.message}</span>
              </div>

              <div>
                <span className="listName">사진 </span>
                <div className="fileContainer">
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
                  <label for="edit-photo" className="findFile">
                    파일찾기
                  </label>
                  {photoPreview === '' ? null : <Preview src={photoPreview} />}
                  {/* <Preview src={photoPreview === '' ? photoPreview : null} /> */}
                </div>

                <span className="sizeError">{errors?.photo?.message}</span>
              </div>
            </li>
            <IsSoldout>
              <span className="listName">매진유무</span>
              <input {...register('isSoldOut')} type="checkbox" />
            </IsSoldout>
          </ul>

          <ModalFooter>
            <Btn>수정</Btn>
            <Link to="/admin/products">
              <Btn className="gray">취소</Btn>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

export default EditModal;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  color: var(--color-indigo);
`;

const Modal = styled.div`
  position: relative;
  z-index: 10;
  width: 500px;
  height: 680px;
  border-radius: 2px;
  background-color: whitesmoke;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;

  align-items: center;
  margin-bottom: 20px;
  .headTitle {
    font-weight: 500;
    font-size: 20px;
    color: #182a4d;
  }
`;
const ModalBody = styled.form`
  height: 90%;
  display: flex;
  flex-direction: column;
  .inputs {
    height: 100%;
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-items: flex-start;
      gap: 7px;
      margin-top: 10px;
      min-height: 30px;

      position: relative;
      .errorMessage {
        color: orangered;
        font-weight: 600;
        font-size: 12px;
        position: absolute;
        top: 2px;
        right: 0;
      }
      .listName {
        font-size: 14px;
        width: 15%;
        flex-shrink: 0;
        font-weight: 500;
      }
      input {
        width: 100%;
        min-height: 30px;
        border: 1px solid var(--color-light-indigo);
        border-radius: 3px;
        padding: 0 5px;
        box-sizing: border-box;
      }
      &:nth-child(3) textarea {
        height: 100px;
        width: 100%;
        /* display: none; */
        border-radius: 3px;
        border: 1px solid var(--color-light-indigo);
        padding: 5px;
        box-sizing: border-box;
      }
      &.files {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > div {
          width: 50%;
        }
      }
      .fileContainer {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        input[type='file'] {
          position: absolute;
          width: 0;
          height: 0;
          padding: 0;
          overflow: hidden;
          border: 0;
        }
        .findFile {
          cursor: pointer;
          height: 20px;
          align-self: flex-start;
          display: flex;
          align-items: center;
          color: white;
          background-color: var(--color-light-indigo);
          border-radius: 3px;
          font-size: 12px;
          padding: 3px;
          transition: 0.3s;
          &:hover {
            background-color: #1874ba;
          }
        }
      }
      &.files > div span.sizeError {
        display: flex;
        height: auto;
        width: auto;
        margin-top: 14px;
        font-size: 14px;
      }
      .tagInput {
        width: 100%;
      }
    }
  }
`;

const IsSoldout = styled.li`
  display: flex;
  position: relative;

  input[type='checkbox'] {
    display: flex;
    width: 15px;
    height: 15px;
    margin: 0;
    position: absolute;
    top: 15px;
    left: 0;
  }
`;
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 30px;
  width: 100%;
  border: 1px dotted #0e436c;
  border-radius: 5px;
  padding: 4px;
  box-sizing: border-box;
  .tagItem {
    display: flex;
    /* overflow: hidden; */
    height: 10px;
    font-size: 10px;
    border: 1px solid #333;
    color: white;
    background-color: #0e436c;
    border-radius: 3px;
    padding: 3px;
    /* box-sizing: content-box; */
    /* margin: 2px; */
  }
`;

const Preview = styled.img`
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  right: 0;
  margin-left: 10px;
  border: 1px solid #ccc;
`;
const ModalFooter = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Btn = styled.button`
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &.gray {
    background-color: var(--color-light-grey1);
  }
  &:hover {
    background-color: #0e436c;
  }
`;
