
import Content from '@/components/Dashboard/Content'
import nextCookie from "next-cookies"

export default function index({user}) {
    return (
        <>
            <Content user={user} />
        </>
    )
}

export const getServerSideProps = (ctx) => {
    const { user } = nextCookie(ctx)
   /*  if (!user.token) {
        return {
            props: { user: null },
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    } */
    return {props:{user}}

}