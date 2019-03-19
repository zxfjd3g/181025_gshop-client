## 1. git分支和合并与冲突
    1). 分支是在开发主线之外编写你的代码完成特定工作而不影响开发主线
    2). 分支的操作:
       查看分支: git branch
       创建分支: git branch dev
       切换分支: git checkout dev
       比较分支: git diff master dev
       合并分支: git merge dev
    3). 冲突
       产生冲突: 当对2个分支进行合并时, 如果同一个文件的同一行内容不一样, 就会产生冲突
       解决冲突:
          修正合并后产生冲突的代码
          git add *
          git commit -m "resolve conflict"
          git push origin master
          
## 2. 区别fork(复刻)与clone(克隆)
    1). fork: 将别人的远程仓库完全复制为自己的远程仓库
    2). clone:  将远程仓库(自己/别人)完全复制为本地仓库
    
## 3. 区别git的pull与fetch
    1). 简单来说，git pull 是 git fetch + git merge
    2). 执行pull: 将远程仓库的更新拉取到本地后, 与本地仓库当前分支进行自动合并(可能会遇到冲突)
    3). 执行fetch: 将远程仓库的更新拉取到一个暂时的新分支上, 后面需要手动进行merge操作(可以先进行diff操作)
    
## 4. Git远程操作命令
    git clone: 克隆远程仓库到本地
    git remote: 添加/删除远程仓库关联
    git push: 将本地仓库推送到远程仓库
    git pull: 从远程仓库更新拉取到本地仓库并与当前分支合并
    git fetch: 从远程仓库更新拉取到本地仓库的临时新分支

## 5. 说说git公司多人协作与开源项目多人协作
    1). 公司多人协作: 先在github上创建组织(修改权限), 多个同事加入此组织, 在组织下创建项目, 成员都可以进行推送更新
    2). 开源多人协作: fork仓库到自己的账户下, 修改fork仓库的代码, 向原仓库发起一个pull request, 对方接收到请求后可以选择合并