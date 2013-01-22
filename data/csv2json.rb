#!/usr/bin/ruby -w

class CSVReader
	attr_accessor :filename

	def initialize(filename)
		@filename=filename
	end

	def to_json()
		File.open(filename, 'r') {|f|
			puts "{"
			f.each_line { |line|
				fields = line.strip().split(",")
				key=fields[0]
				values=fields[1..-1]	
				print " \"#{key}\" : ["
				arrayprefix=""
				values.each { |x|
					print "#{arrayprefix}\"#{x}\""
					arrayprefix=","
				}
				puts "], " 
			}
			puts "}"
		}
	end
end

csv = CSVReader.new(ARGV[0])
csv.to_json()
