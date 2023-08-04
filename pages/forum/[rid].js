import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './article_datail.module.css';
import TagTime from '@/components/common/forum/tag_time';
import DetailTitle from '@/components/common/forum/detail_title';
import DetailP from '@/components/common/forum/detail_p';
import Newnav from '@/components/common/news/new_nav';
import Message from '@/components/common/forum/message';
import MessageInput from '@/components/common/forum/messageinput';
export default function ArticleDetail() {
  const router = useRouter();
  const { query } = router;
  const [article, setArticle] = useState([]);
  const [message, setMessages] = useState([]);
  const [replay, setReplay] = useState('');
  const [authorPhoto, setAuthorPhoto] = useState('');
  const imgPreview = `http://localhost:3002/img/forum/`;

  useEffect(() => {
    console.log(query);
    const { rid } = query;

    if (rid) {
      fetch(`http://localhost:3002/forum/forum/${rid}`)
        .then((r) => r.json())
        .then((data) => {
          console.log(data);

          const { forum_data, messageData } = data;
          setArticle(data);
          setMessages(messageData);
          console.log(forum_data);

          console.log(messageData);

          if (messageData && messageData.length > 0) {
            setMessages(messageData);
          }
          if (forum_data && forum_data.length > 0) {
            setArticle(...forum_data);
          }
        })
        .catch((error) => {
          console.log(error.error);
        });
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('送出訊息:', message);
    setReplay('');
  };

  const handleChange = (e) => {
    setReplay(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <Newnav />
        <div className={styles.flex}>
          <div className={styles.avatar}>
            <img
              src={`http://localhost:3002/img/member/${article.user_photo}`}
            />
          </div>
          <div className={styles.nickname}>{article.nickname}</div>
        </div>
        <div className={styles.ptext}></div>
        <DetailTitle data={article.header} />
        <TagTime data={article.publishedTime} />
        {article.forum_photo && (
          <div className="w-75">
            <img
              src={`${imgPreview + article.forum_photo}`}
              className="w-75 h-50 object-fit-contain"
            />
          </div>
        )}
        <pre>
          <DetailP data={article.forum_content} key={article.forum_sid} />
        </pre>
        <MessageInput messages={message} />
        <Message messages={message} />
      </div>
    </>
  );
}
