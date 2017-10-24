FROM openjdk:8-jre

# dependencies 
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get update && apt-get install -y procps libarchive-dev perlbrew software-properties-common python2.7 nodejs

# install RVM and rubies
RUN gpg --keyserver hkp://keys.gnupg.net:80 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 && curl -sSL https://get.rvm.io -o rvm.sh  && cat rvm.sh | bash -s stable --rails

# install perl 5 / alias python2.7 / pip
RUN bash -c "perlbrew init \
	&& source /root/perl5/perlbrew/etc/bashrc \
	&& echo 'source /root/perl5/perlbrew/etc/bashrc\' >> /root/.bash_profile \
	&& perlbrew install perl-5.27.5 \
	&& curl 'https://bootstrap.pypa.io/get-pip.py' -o 'get-pip.py' \
	&& python get-pip.py"

RUN bash -c "source /usr/local/rvm/scripts/rvm \
	&& rvm use ruby-2.4.1 \
	&& gem install opener-tokenizer \
	&& rvm install jruby-9.1.13.0 \
	&& gem install opener-language-identifier opener-pos-tagger opener-constituent-parser opener-ner-base opener-ner opener-kaf2json"

ADD index.js package.json start.sh ./
RUN npm install forever -g && npm install

EXPOSE 9001

CMD ["/bin/bash", "start.sh"]