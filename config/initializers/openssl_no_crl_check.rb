require "openssl"
puts "*" * 25
puts "Disabling OpenSSL CRL checks"
puts "*" * 25
begin
  flags = OpenSSL::SSL::SSLContext::DEFAULT_PARAMS[:verify_flags]
  if flags
    flags &= ~(OpenSSL::X509::V_FLAG_CRL_CHECK | OpenSSL::X509::V_FLAG_CRL_CHECK_ALL)
    OpenSSL::SSL::SSLContext::DEFAULT_PARAMS[:verify_flags] = flags
  end
rescue => e
  warn "OpenSSL CRL check disable failed: #{e}"
end
