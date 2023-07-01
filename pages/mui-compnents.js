import BlankLayout from '@/components/layout/blank-layout'
import InputTest from '@/components/common/input-test'
import BtnTest from '@/components/common/btn-test'
import Btn from '@/components/common/btn'
import Input from '@/components/common/input'


const MuiComponents = () => {

  return (
    <>
      <p>This is a test page</p>
      <InputTest />
      <hr />
      <BtnTest />
      <Btn />
      <hr/>
      <hr/>
      <hr/>
      <Input label='123'/>
    </>
  )
}


MuiComponents.getLayout = BlankLayout

export default MuiComponents
