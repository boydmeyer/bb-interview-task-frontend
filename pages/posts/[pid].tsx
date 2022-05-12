import type { NextPage } from 'next'
import Script from 'next/script'
import axios from 'axios'

/**
 * Get the media Id from backend
 */
export async function getServerSideProps(context: any) {
  const { pid: postId } = context.query

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )

  const postData = res.data

  const response = await axios.get(
    `https://bb-interview-task-backend.herokuapp.com/media/${postId}`
  )
  const { mediaId } = response.data

  return {
    props: { postData, mediaId },
  }
}

const PostPage: NextPage = ({ postData, mediaId }: any) => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">{postData.title}</h1>
        <p>{postData.body}</p>
        {mediaId && (
          <>
            <p>Media ID: {mediaId}</p>
            <Script
              src={`http://placeholdd.bbvms.com/launchpad/`}
              type="text/javascript"
              async
              strategy="lazyOnload"
              onLoad={() => {
                console.log('loaded')

                // var myPlayer = new bluebillywig.Player(
                //   `http://demo.bbvms.com/p/default/c/${mediaId}.json`,
                //   {
                //     target: document.getElementById('myPlayerDiv'),
                //     autoPlay: 'false',
                //   }
                // )
              }}
            />
          </>
        )}
        <div id="myPlayerDiv"></div>
      </div>
    </>
  )
}

export default PostPage
