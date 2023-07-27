import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Forumbtn from '@/components/common/btn';
import styles from './article_datail.module.css';
import TagTime from '@/components/common/forum/tag_time';
import DetailTitle from '@/components/common/forum/detail_title';
import DetailP from '@/components/common/forum/detail_p';
import Newnav from '@/components/common/news/new_nav';
export default function ArticleDetail() {
  const router = useRouter();
  const { query } = router;
  const [article, setArticle] = useState({});
  const imgPreview = `http://localhost:3002/img/forum/`;

  useEffect(() => {
    const { rid } = query;
    if (rid) {
      fetch(`http://localhost:3002/forum2/forum/${rid}`)
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setArticle(...data);
        });
    }
  }, [query]);
  console.log(article);
  return (
    <>
      
      <div className="container">
      <Newnav />
        <div className="row">
          <div className="col-2">
            <div className={styles.top}>
              <Forumbtn />
            </div>
          </div>
          <div className="col-10">
            <div className={styles.vatar}></div>
            <div className={styles.ptext}></div>
            <DetailTitle data={article.header} />
            <TagTime data={article.publishedTime} />
            <div className="w-75">
              <img
                src={`${imgPreview + article.photo}`}
                className="w-75 h-50 object-fit-contain "
              />
              <pre>
                <DetailP data={article.content} key={article.forum_sid} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
