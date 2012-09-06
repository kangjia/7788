#!/usr/bin/env ruby
require 'net/http'
#desc '发布后检查所有的发布文件'
list = FileList['./**/*.minlist.*']
list.each do |file|
    src = file[1,file.length]
    dest = src.gsub('/src/' , "/prd/")
    dest = dest.gsub('-srclist.' , "-#{qzzver}.")
    tmp_arr = @@CURRENT.split( '/' )
    project_name = tmp_arr[tmp_arr.length-1]
    path_name = project_name + dest
    code = get_httpcode( path_name )
    if code != "200"
        puts "!!!! #{code} !!!!  http//qunarzz.com/#{path_name}"
    end   
end
#---------------------------------------------------
def get_httpcode( path_name )
    resp = Net::HTTP.get_response('qunarzz.com', "/"+path_name)
    return resp.code
end