import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const RustComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    const dsp = await import('../../dsp/pkg/boosh_dsp_bg.wasm');
    // Return a React component that calls the add_one method on the wasm module
    return (props) => <div>{`${props.number} + 5 = `}{dsp.add(props.number, 5)}</div>
  },
})

const Page = ({ router: { query } }) => {
  const number = parseInt(query.number || 0)
  return (
    <div>
      <RustComponent number={number} />
      <Link href={`/?number=${number + 1}`}>
        <a>+</a>
      </Link>
    </div>
  )
}

export default withRouter(Page)