import TakeCoursePage from 'components/TakeCourse';
import Footer from 'common/Footer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { ICourse } from 'components/VideosListPage';


const TakeCourse: React.FC<{ course: ICourse }> = ({ course }) => {

	return (
		<>
			<TakeCoursePage course={course} />
			<Footer />
		</>
	);
};

export default TakeCourse;

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	const c_token = getCookie('c_token', { req, res })
	const { s_token, userId } = getToken(c_token as string)
	const paramz = params?.slug || []
	console.log({ params }, 909383838)

	if (!userId) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
	try {
		axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`
		const { data } = await axios.get(`/courses-user/${paramz[0]}`)
		return {
			props: {
				course: data,
			},
		};
	} catch (e) {
		return {
			props: {
				error: "call failed",
			},
		}

	}
}