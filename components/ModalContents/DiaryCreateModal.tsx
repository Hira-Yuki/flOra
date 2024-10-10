import CustomModal from '@components/CustomElements/CustomModal';
import ModalFormTitleInput from '@components/CustomElements/ModalFormTitleInput';
import ModalSaveButton from '@components/CustomElements/ModalSaveButton';
import { SmallAddIcon } from '@components/icons';
import { eventAPI } from '@lib/api/event';
import dayjs from 'dayjs';
import { useEffect, useId, useState } from 'react';
import { toast } from 'react-toastify';

export default function DiaryCreateModal({ modalController }) {
  const today = dayjs();
  const id = useId();
  const [diaryForm, setDiaryForm] = useState({
    title: '',
    content: '',
    date: today.format('YYYY-MM-DD'),
  });
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState(null);
  const onChange = (key, value) => {
    setDiaryForm((prev) => {
      return { ...prev, [key]: value };
    });
  };

  // 파일 변경 시 처리하는 함수
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // 파일 크기 제한 (10MB)
      const maxFileSize = 10 * 1024 * 1024; // 10MB = 10 * 1024 * 1024 bytes
      if (file.size > maxFileSize) {
        toast.error('파일 크기는 최대 10MB까지 업로드할 수 있습니다.');
        return;
      }

      // 메모리 누수를 방지하기 위해 기존 URL 해제
      if (image) {
        URL.revokeObjectURL(image);
      }

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //------------------- 고쳐야할 수 있음.
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('diaryCreateDto', JSON.stringify(diaryForm));

      const { data } = await eventAPI.createDiary(formData);
      toast.success(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      modalController.setFalse();
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <CustomModal modalController={modalController}>
      <div>
        <span className="py-1.5 px-4 bg-floraYellow rounded-3xl text-mainText">
          {today.format('YYYY.MM.DD')}
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <ModalFormTitleInput
          fullWidth={true}
          value={diaryForm.title}
          onChange={(e) => {
            onChange('title', e.target.value);
          }}
        />
        <hr />
        <div>
          <textarea
            value={diaryForm.content}
            onChange={(e) => {
              onChange('content', e.target.value);
            }}
            placeholder="내용 입력"
            className="block outline-none p-3 w-full resize-none"
            rows={6}
          />
        </div>
        <hr />
        <div>
          {image ? (
            <img
              src={image}
              className="w-10 mt-4 ml-3 hover:grayscale cursor-pointer"
              onClick={() => {
                setImage(null);
                setFile(null);
              }}
            />
          ) : (
            <div>
              <input
                id={id}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                htmlFor={id}
                className="flex bg-floraWhite w-fit rounded-[20px] px-2 py-1 mt-4 ml-3 text-sm cursor-pointer hover:opacity-80"
              >
                <SmallAddIcon /> 이미지 추가
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-row-reverse">
          <ModalSaveButton />
        </div>
      </form>
    </CustomModal>
  );
}
