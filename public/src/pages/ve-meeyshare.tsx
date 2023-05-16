import LayoutFeeds from '@/components/layouts/LayoutFeeds'
import HomeSeo from '@/components/seo/HomeSeo'

const AboutPage = () => {
  return (
    <LayoutFeeds>
      <HomeSeo
        title='MeeyShare - Về MeeyShare'
        description='MeeyShare - Nền tảng chia sẻ tin tức bất động sản cá nhân hóa ứng dụng AI.'
      />
      <div className='w-full md:w-[860px] px-4 mx-auto'>
        <div className='text-fs-32 font-semibold mb-4'>Về MeeyShare</div>
        <div
          className='block-html'
          dangerouslySetInnerHTML={{
            __html: `
            <p>Meeyshare.com&nbsp;l&agrave; &ldquo;Nền tảng chia sẻ tin tức Bất động sản c&aacute; nh&acirc;n h&oacute;a ứng dụng AI&rdquo;&nbsp;thuộc Hệ sinh th&aacute;i C&ocirc;ng nghệ Bất động sản Meey Land (&ldquo;Hệ sinh th&aacute;i&rdquo;) - một Hệ sinh th&aacute;i cung cấp cho thị trường bất động sản c&aacute;c giải ph&aacute;p đột ph&aacute; kết hợp ba lĩnh vực C&ocirc;ng nghệ - Bất động sản - T&agrave;i ch&iacute;nh.</p>
            <p>&Aacute;p dụng những c&ocirc;ng nghệ 4.0 h&agrave;ng đầu như Big Data, AI (Tr&iacute; tuệ nh&acirc;n tạo)&hellip;, Meey Share hướng đến mục ti&ecirc;u l&agrave; sẽ mang lại nhiều lợi &iacute;ch lớn cho Kh&aacute;ch H&agrave;ng khi t&igrave;m kiếm c&aacute;c th&ocirc;ng tin về bất động sản:</p>
            <p>- Th&ocirc;ng tin tập trung, g&oacute;c nh&igrave;n đa chiều.</p>
            <p>- Nội dung chọn lọc v&agrave; được cập nhật nhanh 24/7.</p>
            <p>- Dễ d&agrave;ng theo d&otilde;i th&ocirc;ng tin Bất động sản theo vị tr&iacute;, khu vực.</p>
            <p>- C&aacute; nh&acirc;n h&oacute;a nhu cầu tin tức c&oacute; ứng dụng AI để khi người d&ugrave;ng c&agrave;ng đọc sẽ c&agrave;ng đề xuất ra nội dung ph&ugrave; hợp.</p>
            <p>Đặc biệt, ứng dụng Meey Share được ph&aacute;t triển tr&ecirc;n đa nền tảng (Desktop web, mobile web, mobile app) thuận tiện cho việc người d&ugrave;ng c&oacute; thể lựa chọn sử dụng theo thiết bị, thời gian, kh&ocirc;ng gian&hellip;</p>
`
          }}
        />

        <div className='text-fs-24 font-semibold mb-4'>1. Tầm nhìn</div>
        <p className='text-fs-16'>
          Trở thành nền tảng mạng xã hội chia sẻ tin tức bất động sản cá nhân hoá đa chiều lớn nhất
          tại Đông Nam Á
        </p>
        <div className='text-fs-24 font-semibold mb-4'>2. Sứ mệnh</div>
        <p className='text-fs-16'>
          Mang đến trải nghiệm đọc và chia sẻ tin tức bất động sản cá nhân hoá cho người dùng bằng
          việc áp dụng công nghệ AI
        </p>
        <div className='text-fs-24 font-semibold mb-4'>3. Câu chuyện thương hiệu</div>
        <p className='text-fs-16'>
          “Chọn những gì bạn đọc <br /> Đọc những gì bạn muốn” <br /> <br />
          Mỗi một cá nhân sẽ có nhu cầu khác biệt về tiếp nhận và chia sẻ thông tin thị trường bất
          động sản. Cụ thể, nhà môi giới và người có nhu cầu giao dịch bất động sản chỉ cần các
          thông tin liên quan đến khu vực họ quan tâm. Trong khi đó, nhà đầu tư không chỉ cần các
          thông tin này mà còn muốn biết các thông tin vĩ mô và vi mô (thông tin kinh tế chính trị
          xã hội có tác động tới thị trường bất động sản). Và nhu cầu được cung cấp thông tin bất
          động sản theo thời gian thực được cá nhân hoá vẫn chưa từng được chú ý tới.
        </p>
        <p className='text-fs-16'>
          Nhận thấy điều đó, Meey Share ra đời là nơi để những thành phần tham gia trong thị trường
          bất động sản có thể chủ động chia sẻ những thông tin và hiểu biết của họ, chia sẻ những
          bài báo từ nhiều nguồn dưới trải nghiệm mạng xã hội tương tác đa chiều. Từ đó, mang tới
          cho khách hàng những thông tin hữu ích được cá nhân hoá bằng công nghệ AI như một nhà cung
          cấp tin tức bất động sản chuyên nghiệp.
        </p>
      </div>
    </LayoutFeeds>
  )
}

export default AboutPage
