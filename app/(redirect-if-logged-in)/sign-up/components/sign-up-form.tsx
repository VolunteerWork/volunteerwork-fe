import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Personal from './personal'
import Organization from './organization'

export default function SignUpForm() {
	return (
		<div>
			<h1 className='text-2xl font-bold mb-6'>Đăng ký</h1>

			<Tabs defaultValue='personal'>
				<TabsList className='mb-3'>
					<TabsTrigger value='personal'>Cá nhân</TabsTrigger>
					<TabsTrigger value='organization'>Tổ chức</TabsTrigger>
				</TabsList>

				<TabsContent value='personal'>
					<Personal />
				</TabsContent>

				<TabsContent value='organization'>
					<Organization />
				</TabsContent>
			</Tabs>
		</div>
	)
}
