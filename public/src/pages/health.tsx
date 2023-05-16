// health check URL
function Health() {}

// This gets called on every request
export async function getServerSideProps(context: any) {
	context.res.end('ok')
	return { props: {} }
}

export default Health
